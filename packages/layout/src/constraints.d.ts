/**
 * @jaw/layout - Constraints
 *
 * Resolves min/max constraints on computed sizes.
 * Clamps values to stay within bounds.
 */
import type { JawStyle } from '@jaw/core';
/**
 * Apply min/max width constraints to a computed width.
 */
export declare function clampWidth(width: number, style: JawStyle): number;
/**
 * Apply min/max height constraints to a computed height.
 */
export declare function clampHeight(height: number, style: JawStyle): number;
/**
 * Resolve a dimension value that might be a percentage.
 *
 * @param value - The dimension value (number = px, string with % = percentage)
 * @param parentSize - The parent's size to resolve percentages against
 * @returns Resolved pixel value, or undefined if value is undefined
 */
export declare function resolveDimension(value: number | string | undefined, parentSize: number): number | undefined;
//# sourceMappingURL=constraints.d.ts.map