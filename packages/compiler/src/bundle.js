/**
 * @jaw/compiler - Bundle
 *
 * Uses esbuild to bundle Jaw applications.
 * Supports development (with sourcemaps) and production (minified) builds.
 */
import { build } from 'esbuild';
import { getJawBuildOptions } from './transform';
/**
 * Bundle a Jaw application.
 *
 * @param options - Bundle configuration
 * @returns esbuild BuildResult
 */
export async function bundleApp(options) {
    const { entry, outDir, production = false, external = [], } = options;
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
export async function bundleDev(entry, outDir) {
    return bundleApp({
        entry,
        outDir,
        production: false,
    });
}
/**
 * Bundle for production.
 */
export async function bundleProd(entry, outDir) {
    return bundleApp({
        entry,
        outDir,
        production: true,
    });
}
//# sourceMappingURL=bundle.js.map