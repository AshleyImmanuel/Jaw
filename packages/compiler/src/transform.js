/**
 * @jaw/compiler - Transform
 *
 * Configures the JSX transform for Jaw.
 * Sets up esbuild with the custom Jaw.createElement factory.
 */
/**
 * Default esbuild options for Jaw compilation.
 * Configures JSX to use Jaw.createElement and Jaw.Fragment.
 */
export function getJawBuildOptions(overrides = {}) {
    return {
        jsx: 'transform',
        jsxFactory: 'Jaw.createElement',
        jsxFragment: 'Jaw.Fragment',
        loader: {
            '.ts': 'ts',
            '.tsx': 'tsx',
            '.js': 'js',
            '.jsx': 'jsx',
        },
        target: 'es2022',
        format: 'esm',
        sourcemap: true,
        ...overrides,
    };
}
/**
 * Get the TypeScript compiler options for Jaw projects.
 */
export function getJawTSConfig() {
    return {
        compilerOptions: {
            target: 'ES2022',
            module: 'ES2022',
            moduleResolution: 'bundler',
            jsx: 'react',
            jsxFactory: 'Jaw.createElement',
            jsxFragmentFactory: 'Jaw.Fragment',
            strict: true,
            esModuleInterop: true,
            skipLibCheck: true,
            declaration: true,
            sourceMap: true,
        },
    };
}
//# sourceMappingURL=transform.js.map