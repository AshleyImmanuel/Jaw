/**
 * @jaw/renderer-web - Styles
 *
 * Converts JawStyle + LayoutBox geometry into CSS inline styles.
 * Numbers are converted to pixels, strings pass through.
 */
import type { LayoutBox } from '@jaw/core';
/**
 * Generate CSS style string from a LayoutBox.
 *
 * Combines the node's JawStyle with computed layout geometry.
 * The layout engine has already computed positions and sizes.
 */
export declare function layoutBoxToCSS(layoutBox: LayoutBox): string;
//# sourceMappingURL=styles.d.ts.map