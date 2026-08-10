/**
 * @jaw/components - Column
 *
 * Vertical layout container.
 * Children are laid out top-to-bottom along the main axis.
 * Equivalent to Box with flexDirection: 'column'.
 */
import { createNode } from '@jaw/core';
/**
 * Column -- vertical flex container.
 *
 * Usage:
 *   <Column style={{ gap: 12 }}>
 *     <Text>Top</Text>
 *     <Text>Bottom</Text>
 *   </Column>
 */
export function Column(props) {
    const { children = [], style, ...restProps } = props;
    const normalizedChildren = Array.isArray(children) ? children : [];
    const mergedStyle = {
        flexDirection: 'column',
        ...style,
    };
    return createNode('Column', { ...restProps, style: mergedStyle }, normalizedChildren, props.key);
}
//# sourceMappingURL=Column.js.map