/**
 * @jaw/cli - Dev Command
 *
 * Development server with file watching and hot reload.
 * Compiles, bundles, and serves the app with live reloading.
 */

import { build, context, type BuildContext } from 'esbuild';
import { getJawBuildOptions } from '@jaw/compiler';
import fs from 'fs';
import path from 'path';
import http from 'http';

export interface DevOptions {
  port?: number;
  entry?: string;
  outDir?: string;
}

/**
 * Start the Jaw development server.
 */
export async function startDevServer(options: DevOptions = {}): Promise<void> {
  const {
    port = 3000,
    entry = 'src/app.tsx',
    outDir = 'dist',
  } = options;

  const cwd = process.cwd();
  const entryPath = path.resolve(cwd, entry);
  const outPath = path.resolve(cwd, outDir);

  if (!fs.existsSync(entryPath)) {
    throw new Error(`Entry file not found: ${entryPath}`);
  }

  // Ensure output directory exists
  fs.mkdirSync(outPath, { recursive: true });

  console.log('[Jaw] Starting development server...');

  // Livereload clients
  const clients = new Set<http.ServerResponse>();

  // Initial build with esbuild
  const buildOptions = getJawBuildOptions({
    entryPoints: [entryPath],
    outdir: outPath,
    bundle: true,
    sourcemap: true,
    format: 'esm',
    define: {
      'process.env.NODE_ENV': '"development"',
    },
    plugins: [{
      name: 'jaw-livereload',
      setup(build) {
        build.onEnd(() => {
          for (const client of clients) {
            client.write('data: update\n\n');
          }
        });
      }
    }]
  });

  // Create esbuild context for rebuilds
  const ctx = await context(buildOptions);

  // Initial build
  await ctx.rebuild();
  console.log('[Jaw] Initial build complete.');

  // Watch for changes
  await ctx.watch();
  console.log('[Jaw] Watching for file changes...');

  // Simple HTTP server
  const server = http.createServer((req, res) => {
    // Handle livereload SSE connections
    if (req.url === '/livereload') {
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*'
      });
      clients.add(res);
      req.on('close', () => clients.delete(res));
      return;
    }

    let filePath: string;

    if (req.url === '/' || req.url === '/index.html') {
      filePath = path.join(cwd, 'index.html');
      if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf-8');
        // Inject livereload script
        content = content.replace('</body>', `<script>new EventSource('/livereload').onmessage=()=>location.reload()</script></body>`);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
        return;
      }
    } else {
      filePath = path.join(cwd, req.url ?? '');
    }

    // Resolve file
    if (!fs.existsSync(filePath)) {
      res.writeHead(404);
      res.end('Not Found');
      return;
    }

    const ext = path.extname(filePath);
    const contentTypes: Record<string, string> = {
      '.html': 'text/html',
      '.js': 'application/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.map': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.svg': 'image/svg+xml',
    };

    res.writeHead(200, {
      'Content-Type': contentTypes[ext] ?? 'application/octet-stream',
      'Access-Control-Allow-Origin': '*',
    });
    res.end(fs.readFileSync(filePath));
  });

  server.listen(port, () => {
    console.log(`[Jaw] Dev server running at http://localhost:${port}`);
    console.log('[Jaw] Press Ctrl+C to stop.');
  });

  // Handle shutdown
  process.on('SIGINT', async () => {
    console.log('\n[Jaw] Shutting down...');
    await ctx.dispose();
    server.close();
    process.exit(0);
  });
}
