/**
 * @jaw/renderer-web - Patch
 *
 * Applies patches to the real DOM.
 * Takes a patch list from the differ and executes minimal DOM mutations.
 */
import { createDOMTree } from './dom';
import { layoutBoxToCSS } from './styles';
import { bindEvents } from './events';
/**
 * Apply a list of patches to the DOM.
 *
 * @param patches - Array of patches from the differ
 * @param rootElement - The root DOM element of the rendered tree
 */
export function applyPatches(patches, rootElement) {
    for (const patch of patches) {
        applyPatch(patch, rootElement);
    }
}
/**
 * Apply a single patch to the DOM.
 */
function applyPatch(patch, rootElement) {
    const target = navigateToElement(rootElement, patch.path);
    if (!target)
        return;
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
                    target.textContent = patch.newBox.node.props.content ?? '';
                }
                // Update image src
                if (patch.newBox.node.type === 'Image') {
                    target.src = patch.newBox.node.props.src ?? '';
                    target.alt = patch.newBox.node.props.alt ?? '';
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
function navigateToElement(root, path) {
    let current = root;
    for (const index of path) {
        const child = current.children[index];
        if (!child)
            return null;
        current = child;
    }
    return current;
}
//# sourceMappingURL=patch.js.map