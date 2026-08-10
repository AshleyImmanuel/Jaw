/**
 * @jaw/renderer-web - Patch
 *
 * Applies patches to the real DOM.
 * Takes a patch list from the differ and executes minimal DOM mutations.
 */
import type { Patch } from './diff';
/**
 * Apply a list of patches to the DOM.
 *
 * @param patches - Array of patches from the differ
 * @param rootElement - The root DOM element of the rendered tree
 */
export declare function applyPatches(patches: Patch[], rootElement: HTMLElement): void;
//# sourceMappingURL=patch.d.ts.map