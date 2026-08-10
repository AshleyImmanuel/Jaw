/**
 * @jaw/compiler - Validate
 *
 * Jaw-specific validation passes.
 * Checks that source files follow Jaw conventions.
 */
/** React APIs that should not be used in Jaw projects */
const REACT_APIS = [
    'React.createElement',
    'React.useState',
    'React.useEffect',
    'React.useRef',
    'React.useContext',
    'ReactDOM',
    'react-dom',
    'import React',
    'from "react"',
    "from 'react'",
];
/**
 * Validate source code for Jaw-specific issues.
 *
 * Checks for:
 * - React API usage (should use Jaw APIs instead)
 * - Invalid component patterns
 *
 * @param source - The source code to validate
 * @param filename - The filename for error reporting
 * @returns Array of validation issues
 */
export function validateSource(source, filename) {
    const issues = [];
    const lines = source.split('\n');
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const lineNumber = i + 1;
        // Check for React API usage
        for (const reactApi of REACT_APIS) {
            if (line.includes(reactApi)) {
                issues.push({
                    severity: 'error',
                    message: `React API "${reactApi}" detected. Use Jaw equivalents instead.`,
                    file: filename,
                    line: lineNumber,
                });
            }
        }
        // Check for DOM-specific code in components
        if (line.includes('document.') || line.includes('window.')) {
            if (!filename.includes('renderer-web') && !filename.includes('hot-reload')) {
                issues.push({
                    severity: 'warning',
                    message: 'Direct DOM access detected. Components should be platform-agnostic.',
                    file: filename,
                    line: lineNumber,
                });
            }
        }
    }
    return issues;
}
//# sourceMappingURL=validate.js.map