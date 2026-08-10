/**
 * @jaw/compiler - Diagnostics
 *
 * Formats compiler errors with source locations and Jaw-specific messages.
 */

import type { ValidationIssue } from './validate';

/**
 * Format a validation issue into a human-readable string.
 */
export function formatIssue(issue: ValidationIssue): string {
  const location = issue.file
    ? `${issue.file}${issue.line ? `:${issue.line}` : ''}${issue.column ? `:${issue.column}` : ''}`
    : 'unknown';

  const prefix = issue.severity === 'error' ? 'ERROR'
    : issue.severity === 'warning' ? 'WARN'
    : 'INFO';

  return `[${prefix}] ${location}: ${issue.message}`;
}

/**
 * Format multiple issues into a report.
 */
export function formatReport(issues: ValidationIssue[]): string {
  if (issues.length === 0) {
    return 'No issues found.';
  }

  const errors = issues.filter(i => i.severity === 'error');
  const warnings = issues.filter(i => i.severity === 'warning');

  const lines = issues.map(formatIssue);

  lines.push('');
  lines.push(`Found ${errors.length} error(s) and ${warnings.length} warning(s).`);

  return lines.join('\n');
}
