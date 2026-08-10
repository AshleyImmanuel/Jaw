/**
 * @jaw/compiler - Diagnostics
 *
 * Formats compiler errors with source locations and Jaw-specific messages.
 */
import type { ValidationIssue } from './validate';
/**
 * Format a validation issue into a human-readable string.
 */
export declare function formatIssue(issue: ValidationIssue): string;
/**
 * Format multiple issues into a report.
 */
export declare function formatReport(issues: ValidationIssue[]): string;
//# sourceMappingURL=diagnostics.d.ts.map