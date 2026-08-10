/**
 * @jaw/renderer-web
 *
 * The Jaw Web Renderer. Takes a JawNode tree, computes layout,
 * and renders to the DOM with minimal mutations.
 *
 * This is the main entry point for rendering Jaw apps in the browser.
 */
import type { JawNode, LayoutBox, Renderer, RendererConfig, RendererEventCallback } from '@jaw/core';
export { createDOMTree, mountDOM, updateDOM } from './dom';
export { layoutBoxToCSS } from './styles';
export { bindEvents } from './events';
export { diffTrees } from './diff';
export type { Patch, PatchType } from './diff';
export { applyPatches } from './patch';
/**
 * The Web Renderer.
 *
 * Implements the Renderer interface for the browser (DOM + CSS).
 */
export declare class WebRenderer implements Renderer {
    readonly name = "web";
    private container;
    private currentTree;
    private eventCallback;
    private config;
    constructor(config?: RendererConfig);
    /**
     * Mount a layout tree into a DOM container.
     */
    mount(tree: LayoutBox, container: unknown): void;
    /**
     * Update the rendered DOM with a new layout tree.
     */
    update(oldTree: LayoutBox, newTree: LayoutBox): void;
    /**
     * Unmount and clean up.
     */
    unmount(): void;
    /**
     * Register event callback for renderer-to-runtime communication.
     */
    onEvent(callback: RendererEventCallback): void;
}
/**
 * Render a Jaw app to the DOM.
 *
 * This is the high-level API that most developers will use.
 * It handles the full pipeline: tree -> layout -> DOM.
 *
 * @param rootNode - The root JawNode of the app
 * @param container - The DOM element to render into
 * @param width - Container width (defaults to container's clientWidth)
 * @param height - Container height (defaults to container's clientHeight)
 * @returns A re-render function that can be called with a new tree
 */
export declare function render(rootNode: JawNode, container: HTMLElement, width?: number, height?: number): (newNode: JawNode) => void;
//# sourceMappingURL=index.d.ts.map