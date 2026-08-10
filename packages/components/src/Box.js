/**
 * @jaw/components - Box
 *
 * The fundamental container component.
 * Box is a generic flex container that can hold any children.
 * Default flex direction: column.
 */
import { createNode } from '@jaw/core';
/**
 * Box -- generic flex container.
 *
 * Usage:
 *   <Box style={{ width: 200, height: 100, backgroundColor: '#333' }}>
 *     <Text>Hello</Text>
 *   </Box>
 */
export function Box(props) {
    const { children = [], ...restProps } = props;
    const normalizedChildren = Array.isArray(children) ? children : [];
    return createNode('Box', restProps, normalizedChildren, props.key);
}
//# sourceMappingURL=Box.js.map