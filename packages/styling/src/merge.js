/**
 * @jaw/styling - Merge
 *
 * Deep-merge style objects. Later styles override earlier ones.
 * Used to combine default styles with user-provided styles.
 */
/**
 * Merge two style objects. Properties in `override` take priority.
 *
 * @param base - The base styles (e.g., component defaults)
 * @param override - The overriding styles (e.g., user-provided)
 * @returns A new merged style object
 */
export function mergeStyles(base, override) {
    if (!override)
        return { ...base };
    return { ...base, ...override };
}
/**
 * Merge multiple style objects in order.
 * Later objects override earlier ones.
 *
 * @param styles - Array of style objects to merge
 * @returns A single merged style object
 */
export function mergeStyleList(...styles) {
    const result = {};
    for (const style of styles) {
        if (style) {
            Object.assign(result, style);
        }
    }
    return result;
}
//# sourceMappingURL=merge.js.map