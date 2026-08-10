/**
 * @jaw/layout - Box Model
 *
 * Resolves margin, padding, and border for layout computation.
 * Converts JawStyle spacing values into ResolvedEdges.
 */
import { resolveEdges, resolveBorderEdges } from '@jaw/styling';
/**
 * Extract and resolve the box model from a JawStyle.
 */
export function resolveBoxModel(style) {
    return {
        margin: resolveEdges(style.margin, style.marginTop, style.marginRight, style.marginBottom, style.marginLeft),
        padding: resolveEdges(style.padding, style.paddingTop, style.paddingRight, style.paddingBottom, style.paddingLeft),
        border: resolveBorderEdges(style),
    };
}
/**
 * Compute the total horizontal space consumed by the box model
 * (margin + border + padding on left and right).
 */
export function horizontalBoxSpace(model) {
    return (model.margin.left + model.margin.right +
        model.border.left + model.border.right +
        model.padding.left + model.padding.right);
}
/**
 * Compute the total vertical space consumed by the box model
 * (margin + border + padding on top and bottom).
 */
export function verticalBoxSpace(model) {
    return (model.margin.top + model.margin.bottom +
        model.border.top + model.border.bottom +
        model.padding.top + model.padding.bottom);
}
//# sourceMappingURL=box-model.js.map