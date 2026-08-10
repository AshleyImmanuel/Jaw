/**
 * @jaw/renderer-web
 *
 * The Jaw Web Renderer. Takes a JawNode tree, computes layout,
 * and renders to the DOM with minimal mutations.
 *
 * This is the main entry point for rendering Jaw apps in the browser.
 */

import type { JawNode, LayoutBox, Renderer, RendererConfig, RendererEventCallback } from '@jaw/core';
import { computeLayout } from '@jaw/layout';
import { mountDOM, updateDOM } from './dom';
import { diffTrees } from './diff';
import { applyPatches } from './patch';

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
export class WebRenderer implements Renderer {
  readonly name = 'web';

  private container: HTMLElement | null = null;
  private currentTree: LayoutBox | null = null;
  private eventCallback: RendererEventCallback | null = null;
  private config: RendererConfig;

  constructor(config: RendererConfig = {}) {
    this.config = config;
  }

  /**
   * Mount a layout tree into a DOM container.
   */
  mount(tree: LayoutBox, container: unknown): void {
    this.container = container as HTMLElement;
    this.currentTree = tree;
    mountDOM(tree, this.container);
  }

  /**
   * Update the rendered DOM with a new layout tree.
   */
  update(oldTree: LayoutBox, newTree: LayoutBox): void {
    if (!this.container) return;

    this.currentTree = newTree;
    // Use full re-render for reliability in Beta 1
    updateDOM(newTree, this.container);
  }

  /**
   * Unmount and clean up.
   */
  unmount(): void {
    if (this.container) {
      this.container.innerHTML = '';
    }
    this.currentTree = null;
    this.container = null;
  }

  /**
   * Register event callback for renderer-to-runtime communication.
   */
  onEvent(callback: RendererEventCallback): void {
    this.eventCallback = callback;
  }
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
export function render(
  rootNode: JawNode,
  container: HTMLElement,
  width?: number,
  height?: number,
): (newNode: JawNode) => void {
  const containerWidth = width ?? container.clientWidth;
  const containerHeight = height ?? container.clientHeight;

  // Compute layout
  let currentLayout = computeLayout(rootNode, containerWidth, containerHeight);

  // Mount to DOM
  mountDOM(currentLayout, container);

  // Return re-render function
  return (newNode: JawNode) => {
    const w = width ?? container.clientWidth;
    const h = height ?? container.clientHeight;
    const newLayout = computeLayout(newNode, w, h);
    updateDOM(newLayout, container);
    currentLayout = newLayout;
  };
}
