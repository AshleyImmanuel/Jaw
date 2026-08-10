/**
 * @jaw/renderer-web - Diff
 *
 * Tree diffing algorithm for the web renderer.
 * Compares old and new LayoutBox trees and produces a patch list.
 */
import type { LayoutBox } from '@jaw/core';
/** Types of patches that can be applied to the DOM */
export type PatchType = 'create' | 'update' | 'remove' | 'replace' | 'reorder';
export interface Patch {
    type: PatchType;
    /** Path from root to this node (array of child indices) */
    path: number[];
    /** The old layout box (for update/remove/replace) */
    oldBox?: LayoutBox;
    /** The new layout box (for create/update/replace) */
    newBox?: LayoutBox;
}
/**
 * Diff two LayoutBox trees and produce a list of patches.
 *
 * @param oldTree - The previous render's layout tree
 * @param newTree - The new layout tree
 * @returns Array of patches to apply
 */
export declare function diffTrees(oldTree: LayoutBox | null, newTree: LayoutBox | null): Patch[];
//# sourceMappingURL=diff.d.ts.map