/**
 * @jaw/styling - Validate
 *
 * Validates style values and flags unsupported properties.
 * Unsupported in Beta 1: grid, filters, blend modes, pseudo-elements.
 */
import type { JawStyle } from '@jaw/core';
export interface ValidationResult {
    valid: boolean;
    warnings: string[];
    errors: string[];
}
/**
 * Validate a JawStyle object.
 *
 * Returns warnings for unsupported properties and errors for
 * invalid values.
 *
 * @param style - The style object to validate
 * @returns Validation result with warnings and errors
 */
export declare function validateStyle(style: JawStyle): ValidationResult;
//# sourceMappingURL=validate.d.ts.map