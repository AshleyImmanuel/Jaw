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
 * Update the DOM by re-rendering the entire tree.
 *
 * For Beta 1, this is a full re-render (replace entire DOM tree).
 * The diff/patch system in diff.ts provides the optimization path.
 *
 * @param newTree - The new LayoutBox tree
 * @param container - The DOM container
 */
export declare function updateDOM(newTree: LayoutBox, container: HTMLElement): void;
//# sourceMappingURL=dom.d.ts.map