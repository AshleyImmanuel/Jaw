/**
 * @jaw/styling - Normalize
 *
 * Expands shorthand style properties into their long-form equivalents.
 * For example, margin: 10 becomes { marginTop: 10, marginRight: 10, ... }
 */
import type { JawStyle, ResolvedEdges, SpacingEdges } from '@jaw/core';
/**
 * Resolve a spacing value (margin or padding) into four edges.
 *
 * Accepts:
 * - A number: applies to all four sides
 * - A SpacingEdges object: { top, right, bottom, left }
 * - undefined: all zeros
 */
export declare function resolveEdges(value: number | SpacingEdges | undefined, topOverride?: number, rightOverride?: number, bottomOverride?: number, leftOverride?: number): ResolvedEdges;
/**
 * Resolve border widths into four edges.
 */
export declare function resolveBorderEdges(style: JawStyle): ResolvedEdges;
/**
 * Normalize a JawStyle by expanding all shorthands.
 *
 * This is called by the layout engine before computing layout,
 * so the layout engine only deals with fully resolved values.
 */
export declare function normalizeStyle(style: JawStyle): JawStyle;
//# sourceMappingURL=normalize.d.ts.map