/**
 * @jaw/compiler - Transform
 *
 * Configures the JSX transform for Jaw.
 * Sets up esbuild with the custom Jaw.createElement factory.
 */
import type { BuildOptions } from 'esbuild';
/**
 * Default esbuild options for Jaw compilation.
 * Configures JSX to use Jaw.createElement and Jaw.Fragment.
 */
export declare function getJawBuildOptions(overrides?: Partial<BuildOptions>): BuildOptions;
/**
 * Get the TypeScript compiler options for Jaw projects.
 */
export declare function getJawTSConfig(): Record<string, unknown>;
//# sourceMappingURL=transform.d.ts.map