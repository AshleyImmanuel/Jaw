/**
 * @jaw/renderer-web - DOM
 *
 * Creates and updates DOM elements from LayoutBox trees.
 * This is the bridge between the Jaw layout system and the browser.
 */

import type { LayoutBox, JawNode } from '@jaw/core';
import { layoutBoxToCSS } from './styles';
import { bindEvents } from './events';
import { diffTrees } from './diff';
import { applyPatches } from './patch';

/** Map component types to HTML tag names */
const TAG_MAP: Record<string, string> = {
  Box: 'div',
  Row: 'div',
  Column: 'div',
  Text: 'span',
  Button: 'button',
  Image: 'img',
  Spacer: 'div',
  Scroll: 'div',
  Fragment: 'div',
};

/**
 * Create a DOM tree from a LayoutBox tree.
 *
 * Recursively creates DOM elements for each LayoutBox,
 * applies styles, binds events, and appends children.
 *
 * @param layoutBox - The root LayoutBox to render
 * @returns The created DOM element
 */
export function createDOMTree(layoutBox: LayoutBox): HTMLElement {
  const node = layoutBox.node;
  const tagName = TAG_MAP[node.type] ?? 'div';

  const element = document.createElement(tagName);

  // Apply computed styles
  element.setAttribute('style', layoutBoxToCSS(layoutBox));

  // Set data attribute for debugging
  element.setAttribute('data-jaw-type', node.type);

  // Handle special node types
  if (node.type === 'Text') {
    const content = node.props.content as string ?? '';
    element.textContent = content;
  } else if (node.type === 'Image') {
    (element as HTMLImageElement).src = node.props.src as string ?? '';
    (element as HTMLImageElement).alt = node.props.alt as string ?? '';
  } else if (node.type === 'Button' && node.props.disabled) {
    (element as HTMLButtonElement).disabled = true;
  }

  // Bind event handlers
  bindEvents(element, node);

  // Recursively create children
  for (const childBox of layoutBox.children) {
    const childElement = createDOMTree(childBox);
    element.appendChild(childElement);
  }

  return element;
}

/**
 * Mount a LayoutBox tree into a container element.
 *
 * Clears the container and renders the entire tree.
 *
 * @param tree - The root LayoutBox
 * @param container - The DOM container to render into
 */
export function mountDOM(tree: LayoutBox, container: HTMLElement): void {
  container.innerHTML = '';
  const rootElement = createDOMTree(tree);
  container.appendChild(rootElement);
}

/**
 * Update the DOM by diffing the old and new trees.
 *
 * @param oldTree - The previous LayoutBox tree
 * @param newTree - The new LayoutBox tree
 * @param container - The DOM container
 */
export function updateDOM(oldTree: LayoutBox | null, newTree: LayoutBox, container: HTMLElement): void {
  // If there's no old tree, do a full initial mount
  if (!oldTree) {
    mountDOM(newTree, container);
    return;
  }

  // Generate patches by diffing the old and new trees
  const patches = diffTrees(oldTree, newTree);
  
  // Apply patches to the root element inside the container
  const rootElement = container.firstElementChild as HTMLElement;
  if (rootElement) {
    applyPatches(patches, rootElement);
  } else {
    // Fallback if root element is missing
    mountDOM(newTree, container);
  }
}
