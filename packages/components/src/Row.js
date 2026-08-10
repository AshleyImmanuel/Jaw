/**
 * @jaw/components - Row
 *
 * Horizontal layout container.
 * Children are laid out left-to-right along the main axis.
 * Equivalent to Box with flexDirection: 'row'.
 */
import { createNode } from '@jaw/core';
/**
 * Row -- horizontal flex container.
 *
 * Usage:
 *   <Row style={{ gap: 8 }}>
 *     <Text>Left</Text>
 *     <Text>Right</Text>
 *   </Row>
 */
export function Row(props) {
    const { children = [], style, ...restProps } = props;
    const normalizedChildren = Array.isArray(children) ? children : [];
    // Merge flexDirection: 'row' into the style
    const mergedStyle = {
        flexDirection: 'row',
        ...style,
    };
    return createNode('Row', { ...restProps, style: mergedStyle }, normalizedChildren, props.key);
}
//# sourceMappingURL=Row.js.map