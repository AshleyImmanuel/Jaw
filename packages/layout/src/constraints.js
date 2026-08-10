/**
 * @jaw/layout - Constraints
 *
 * Resolves min/max constraints on computed sizes.
 * Clamps values to stay within bounds.
 */
/**
 * Apply min/max width constraints to a computed width.
 */
export function clampWidth(width, style) {
    let result = width;
    if (style.minWidth !== undefined && result < style.minWidth) {
        result = style.minWidth;
    }
    if (style.maxWidth !== undefined && result > style.maxWidth) {
        result = style.maxWidth;
    }
    // If minWidth > maxWidth, min wins (per CSS spec)
    if (style.minWidth !== undefined && style.maxWidth !== undefined &&
        style.minWidth > style.maxWidth) {
        result = style.minWidth;
    }
    return Math.max(0, result);
}
/**
 * Apply min/max height constraints to a computed height.
 */
export function clampHeight(height, style) {
    let result = height;
    if (style.minHeight !== undefined && result < style.minHeight) {
        result = style.minHeight;
    }
    if (style.maxHeight !== undefined && result > style.maxHeight) {
        result = style.maxHeight;
    }
    // If minHeight > maxHeight, min wins (per CSS spec)
    if (style.minHeight !== undefined && style.maxHeight !== undefined &&
        style.minHeight > style.maxHeight) {
        result = style.minHeight;
    }
    return Math.max(0, result);
}
/**
 * Resolve a dimension value that might be a percentage.
 *
 * @param value - The dimension value (number = px, string with % = percentage)
 * @param parentSize - The parent's size to resolve percentages against
 * @returns Resolved pixel value, or undefined if value is undefined
 */
export function resolveDimension(value, parentSize) {
    if (value === undefined)
        return undefined;
    if (typeof value === 'number')
        return value;
    if (typeof value === 'string' && value.endsWith('%')) {
        const pct = parseFloat(value);
        if (!isNaN(pct)) {
            return (pct / 100) * parentSize;
        }
    }
    return undefined;
}
//# sourceMappingURL=constraints.js.map