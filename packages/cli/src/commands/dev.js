/**
 * @jaw/cli - Dev Command
 *
 * Development server with file watching and hot reload.
 * Compiles, bundles, and serves the app with live reloading.
 */
import { context } from 'esbuild';
import { getJawBuildOptions } from '@jaw/compiler';
import fs from 'fs';
import path from 'path';
import http from 'http';
/**
 * Start the Jaw development server.
 */
export async function startDevServer(options = {}) {
    const { port = 3000, entry = 'src/app.tsx', outDir = 'dist', } = options;
    const cwd = process.cwd();
    const entryPath = path.resolve(cwd, entry);
    const outPath = path.resolve(cwd, outDir);
    if (!fs.existsSync(entryPath)) {
        throw new Error(`Entry file not found: ${entryPath}`);
    }
    // Ensure output directory exists
    fs.mkdirSync(outPath, { recursive: true });
    console.log('[Jaw] Starting development server...');
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
        let filePath;
        if (req.url === '/' || req.url === '/index.html') {
            filePath = path.join(cwd, 'index.html');
        }
        else {
            filePath = path.join(cwd, req.url ?? '');
        }
        // Resolve file
        if (!fs.existsSync(filePath)) {
            res.writeHead(404);
            res.end('Not Found');
            return;
        }
        const ext = path.extname(filePath);
        const contentTypes = {
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
//# sourceMappingURL=dev.js.map