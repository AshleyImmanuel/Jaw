/**
 * @jaw/layout - Engine
 *
 * The main layout algorithm. Takes a JawNode tree and produces
 * a LayoutBox tree with computed positions and sizes.
 *
 * This is a flexbox-inspired, deterministic layout engine.
 * It is platform-independent -- no DOM or native APIs.
 */
import type { JawNode, LayoutBox } from '@jaw/core';
/**
 * Compute layout for a JawNode tree.
 *
 * This is the main entry point for the layout engine.
 * It takes the root node and the container dimensions, and returns
 * a fully laid-out LayoutBox tree.
 *
 * @param rootNode - The root JawNode to lay out
 * @param containerWidth - Available width from the container
 * @param containerHeight - Available height from the container
 * @returns A LayoutBox tree with computed geometry
 */
export declare function computeLayout(rootNode: JawNode, containerWidth: number, containerHeight: number): LayoutBox;
//# sourceMappingURL=engine.d.ts.map