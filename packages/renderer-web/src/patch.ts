/**
 * @jaw/renderer-web - Patch
 *
 * Applies patches to the real DOM.
 * Takes a patch list from the differ and executes minimal DOM mutations.
 */

import type { LayoutBox } from '@jaw/core';
import type { Patch } from './diff';
import { createDOMTree } from './dom';
import { layoutBoxToCSS } from './styles';
import { bindEvents } from './events';

/**
 * Apply a list of patches to the DOM.
 *
 * @param patches - Array of patches from the differ
 * @param rootElement - The root DOM element of the rendered tree
 */
export function applyPatches(
  patches: Patch[],
  rootElement: HTMLElement,
): void {
  for (const patch of patches) {
    applyPatch(patch, rootElement);
  }
}

/**
 * Apply a single patch to the DOM.
 */
function applyPatch(patch: Patch, rootElement: HTMLElement): void {
  const target = navigateToElement(rootElement, patch.path);
  if (!target) return;

  switch (patch.type) {
    case 'create': {
      if (patch.newBox) {
        const newElement = createDOMTree(patch.newBox);
        target.parentElement?.appendChild(newElement);
      }
      break;
    }
    case 'update': {
      if (patch.newBox) {
        // Update styles
        target.setAttribute('style', layoutBoxToCSS(patch.newBox));

        // Update text content
        if (patch.newBox.node.type === 'Text') {
          target.textContent = patch.newBox.node.props.content as string ?? '';
        }

        // Update image src
        if (patch.newBox.node.type === 'Image') {
          (target as HTMLImageElement).src = patch.newBox.node.props.src as string ?? '';
          (target as HTMLImageElement).alt = patch.newBox.node.props.alt as string ?? '';
        }

        // Re-bind events
        bindEvents(target, patch.newBox.node);
      }
      break;
    }
    case 'remove': {
      target.remove();
      break;
    }
    case 'replace': {
      if (patch.newBox) {
        const newElement = createDOMTree(patch.newBox);
        target.replaceWith(newElement);
      }
      break;
    }
  }
}

/**
 * Navigate from a root element to a child using a path of indices.
 */
function navigateToElement(
  root: HTMLElement,
  path: number[],
): HTMLElement | null {
  let current: HTMLElement = root;
  for (const index of path) {
    const child = current.children[index] as HTMLElement | undefined;
    if (!child) return null;
    current = child;
  }
  return current;
}
