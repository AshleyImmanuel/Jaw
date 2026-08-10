/**
 * @jaw/compiler - Bundle
 *
 * Uses esbuild to bundle Jaw applications.
 * Supports development (with sourcemaps) and production (minified) builds.
 */

import { build, type BuildResult } from 'esbuild';
import { getJawBuildOptions } from './transform';
import path from 'path';

export interface BundleOptions {
  /** Entry point file */
  entry: string;
  /** Output directory */
  outDir: string;
  /** Production mode (enables minification) */
  production?: boolean;
  /** Watch mode for development */
  watch?: boolean;
  /** External packages to exclude from bundle */
  external?: string[];
}

/**
 * Bundle a Jaw application.
 *
 * @param options - Bundle configuration
 * @returns esbuild BuildResult
 */
export async function bundleApp(options: BundleOptions): Promise<BuildResult> {
  const {
    entry,
    outDir,
    production = false,
    external = [],
  } = options;

  const buildOptions = getJawBuildOptions({
    entryPoints: [entry],
    outdir: outDir,
    bundle: true,
    minify: production,
    sourcemap: !production || 'linked',
    splitting: false,
    external,
    define: {
      'process.env.NODE_ENV': production ? '"production"' : '"development"',
    },
    banner: {
      js: production
        ? '/* Built with Jaw */'
        : '/* Jaw Development Build */',
    },
  });

  return build(buildOptions);
}

/**
 * Bundle for development with watch mode.
 */
export async function bundleDev(entry: string, outDir: string): Promise<BuildResult> {
  return bundleApp({
    entry,
    outDir,
    production: false,
  });
}

/**
 * Bundle for production.
 */
export async function bundleProd(entry: string, outDir: string): Promise<BuildResult> {
  return bundleApp({
    entry,
    outDir,
    production: true,
  });
}
