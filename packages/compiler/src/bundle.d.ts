/**
 * @jaw/compiler - Bundle
 *
 * Uses esbuild to bundle Jaw applications.
 * Supports development (with sourcemaps) and production (minified) builds.
 */
import { type BuildResult } from 'esbuild';
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
export declare function bundleApp(options: BundleOptions): Promise<BuildResult>;
/**
 * Bundle for development with watch mode.
 */
export declare function bundleDev(entry: string, outDir: string): Promise<BuildResult>;
/**
 * Bundle for production.
 */
export declare function bundleProd(entry: string, outDir: string): Promise<BuildResult>;
//# sourceMappingURL=bundle.d.ts.map