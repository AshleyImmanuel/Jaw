/**
 * @jaw/core - Node Types
 *
 * Defines the Universal Component Tree (UCT) node structure.
 * Every Jaw component ultimately produces JawNode instances.
 * These nodes are platform-agnostic -- they carry no DOM or native references.
 */
/** Type guard: check if a value is a JawNode */
export function isJawNode(value) {
    return (typeof value === 'object' &&
        value !== null &&
        value.__jaw === true);
}
/** Type guard: check if a node is a text node */
export function isTextNode(node) {
    return node.type === 'Text' && 'content' in node.props;
}
/** Create a raw JawNode (used internally by createElement) */
export function createNode(type, props, children, key) {
    return Object.freeze({
        type,
        props: Object.freeze(props),
        children: Object.freeze(children),
        key,
        __jaw: true,
    });
}
//# sourceMappingURL=node.js.map