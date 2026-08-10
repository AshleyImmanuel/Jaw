/**
 * @jaw/cli - Build Command
 *
 * Production build. Compiles, bundles, and minifies the app.
 */
export interface BuildCommandOptions {
    entry?: string;
    outDir?: string;
}
/**
 * Run a production build.
 */
export declare function runBuild(options?: BuildCommandOptions): Promise<void>;
//# sourceMappingURL=build.d.ts.map