/**
 * @jaw/cli - Build Command
 *
 * Production build. Compiles, bundles, and minifies the app.
 */

import { bundleProd } from '@jaw/compiler';
import path from 'path';
import fs from 'fs';

export interface BuildCommandOptions {
  entry?: string;
  outDir?: string;
}

/**
 * Run a production build.
 */
export async function runBuild(options: BuildCommandOptions = {}): Promise<void> {
  const {
    entry = 'src/app.tsx',
    outDir = 'dist',
  } = options;

  const cwd = process.cwd();
  const entryPath = path.resolve(cwd, entry);
  const outPath = path.resolve(cwd, outDir);

  if (!fs.existsSync(entryPath)) {
    throw new Error(`Entry file not found: ${entryPath}`);
  }

  console.log('[Jaw] Building for production...');

  fs.mkdirSync(outPath, { recursive: true });

  const result = await bundleProd(entryPath, outPath);

  if (result.errors.length > 0) {
    console.error('[Jaw] Build failed with errors:');
    for (const error of result.errors) {
      console.error(`  ${error.text}`);
    }
    process.exit(1);
  }

  if (result.warnings.length > 0) {
    for (const warning of result.warnings) {
      console.warn(`  [WARN] ${warning.text}`);
    }
  }

  console.log('[Jaw] Build complete. Output in:', outDir);
}
