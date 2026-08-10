/**
 * @jaw/cli - Dev Command
 *
 * Development server with file watching and hot reload.
 * Compiles, bundles, and serves the app with live reloading.
 */
export interface DevOptions {
    port?: number;
    entry?: string;
    outDir?: string;
}
/**
 * Start the Jaw development server.
 */
export declare function startDevServer(options?: DevOptions): Promise<void>;
//# sourceMappingURL=dev.d.ts.map