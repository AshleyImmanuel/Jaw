/**
 * @jaw/compiler - Validate
 *
 * Jaw-specific validation passes.
 * Checks that source files follow Jaw conventions.
 */
/** Validation issue severity */
export type Severity = 'error' | 'warning' | 'info';
export interface ValidationIssue {
    severity: Severity;
    message: string;
    file?: string;
    line?: number;
    column?: number;
}
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
export declare function validateSource(source: string, filename: string): ValidationIssue[];
//# sourceMappingURL=validate.d.ts.map