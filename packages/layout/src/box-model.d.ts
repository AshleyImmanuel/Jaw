/**
 * @jaw/layout - Box Model
 *
 * Resolves margin, padding, and border for layout computation.
 * Converts JawStyle spacing values into ResolvedEdges.
 */
import type { JawStyle, ResolvedEdges } from '@jaw/core';
/**
 * Resolve all spacing edges (margin, padding, border) from a style.
 */
export interface ResolvedBoxModel {
    margin: ResolvedEdges;
    padding: ResolvedEdges;
    border: ResolvedEdges;
}
/**
 * Extract and resolve the box model from a JawStyle.
 */
export declare function resolveBoxModel(style: JawStyle): ResolvedBoxModel;
/**
 * Compute the total horizontal space consumed by the box model
 * (margin + border + padding on left and right).
 */
export declare function horizontalBoxSpace(model: ResolvedBoxModel): number;
/**
 * Compute the total vertical space consumed by the box model
 * (margin + border + padding on top and bottom).
 */
export declare function verticalBoxSpace(model: ResolvedBoxModel): number;
//# sourceMappingURL=box-model.d.ts.map