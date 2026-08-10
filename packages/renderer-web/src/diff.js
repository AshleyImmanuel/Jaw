/**
 * @jaw/renderer-web - Diff
 *
 * Tree diffing algorithm for the web renderer.
 * Compares old and new LayoutBox trees and produces a patch list.
 */
/**
 * Diff two LayoutBox trees and produce a list of patches.
 *
 * @param oldTree - The previous render's layout tree
 * @param newTree - The new layout tree
 * @returns Array of patches to apply
 */
export function diffTrees(oldTree, newTree) {
    const patches = [];
    diffNode(oldTree, newTree, [], patches);
    return patches;
}
/**
 * Recursively diff two nodes.
 */
function diffNode(oldBox, newBox, path, patches) {
    // New node where none existed
    if (!oldBox && newBox) {
        patches.push({ type: 'create', path: [...path], newBox });
        return;
    }
    // Node removed
    if (oldBox && !newBox) {
        patches.push({ type: 'remove', path: [...path], oldBox });
        return;
    }
    // Both null -- nothing to do
    if (!oldBox || !newBox)
        return;
    // Different node types -- full replace
    if (oldBox.node.type !== newBox.node.type) {
        patches.push({ type: 'replace', path: [...path], oldBox, newBox });
        return;
    }
    // Same type -- check if props or layout changed
    if (hasNodeChanged(oldBox, newBox)) {
        patches.push({ type: 'update', path: [...path], oldBox, newBox });
    }
    // Diff children
    const maxChildren = Math.max(oldBox.children.length, newBox.children.length);
    for (let i = 0; i < maxChildren; i++) {
        const oldChild = oldBox.children[i] ?? null;
        const newChild = newBox.children[i] ?? null;
        diffNode(oldChild, newChild, [...path, i], patches);
    }
}
/**
 * Check if a node's rendered output has changed.
 */
function hasNodeChanged(oldBox, newBox) {
    // Check layout changes
    if (oldBox.x !== newBox.x || oldBox.y !== newBox.y ||
        oldBox.width !== newBox.width || oldBox.height !== newBox.height) {
        return true;
    }
    // Check key props
    const oldNode = oldBox.node;
    const newNode = newBox.node;
    // For text nodes, check content
    if (oldNode.type === 'Text') {
        if (oldNode.props.content !== newNode.props.content)
            return true;
    }
    // Check style reference equality (quick check)
    if (oldNode.props.style !== newNode.props.style)
        return true;
    return false;
}
//# sourceMappingURL=diff.js.map