/**
 * @jaw/styling - Merge
 *
 * Deep-merge style objects. Later styles override earlier ones.
 * Used to combine default styles with user-provided styles.
 */
import type { JawStyle } from '@jaw/core';
/**
 * Merge two style objects. Properties in `override` take priority.
 *
 * @param base - The base styles (e.g., component defaults)
 * @param override - The overriding styles (e.g., user-provided)
 * @returns A new merged style object
 */
export declare function mergeStyles(base: JawStyle, override: JawStyle | undefined): JawStyle;
/**
 * Merge multiple style objects in order.
 * Later objects override earlier ones.
 *
 * @param styles - Array of style objects to merge
 * @returns A single merged style object
 */
export declare function mergeStyleList(...styles: (JawStyle | undefined)[]): JawStyle;
//# sourceMappingURL=merge.d.ts.map