/**
 * @jaw/compiler
 *
 * The Jaw compiler. Transforms JSX, validates source, bundles output.
 */
export { getJawBuildOptions, getJawTSConfig } from './transform';
export { validateSource } from './validate';
export type { ValidationIssue, Severity } from './validate';
export { bundleApp, bundleDev, bundleProd } from './bundle';
export type { BundleOptions } from './bundle';
export { formatIssue, formatReport } from './diagnostics';
//# sourceMappingURL=index.d.ts.map