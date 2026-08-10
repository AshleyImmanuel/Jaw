/**
 * @jaw/renderer-web - DOM
 *
 * Creates and updates DOM elements from LayoutBox trees.
 * This is the bridge between the Jaw layout system and the browser.
 */
import type { LayoutBox } from '@jaw/core';
/**
 * Create a DOM tree from a LayoutBox tree.
 *
 * Recursively creates DOM elements for each LayoutBox,
 * applies styles, binds events, and appends children.
 *
 * @param layoutBox - The root LayoutBox to render
 * @returns The created DOM element
 */
export declare function createDOMTree(layoutBox: LayoutBox): HTMLElement;
/**
 * Mount a LayoutBox tree into a container element.
 *
 * Clears the container and renders the entire tree.
 *
 * @param tree - The root LayoutBox
 * @param container - The DOM container to render into
 */
export declare function mountDOM(tree: LayoutBox, container: HTMLElement): void;
/**
 * Update the DOM by diffing the old and new trees.
 *
 * @param oldTree - The previous LayoutBox tree
 * @param newTree - The new LayoutBox tree
 * @param container - The DOM container
 */
export declare function updateDOM(oldTree: LayoutBox | null, newTree: LayoutBox, container: HTMLElement): void;
//# sourceMappingURL=dom.d.ts.map