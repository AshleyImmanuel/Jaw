/**
 * @jaw/components - Spacer
 *
 * Flexible space component.
 * Takes up remaining space in a flex container, or a fixed size.
 */
import { createNode } from '@jaw/core';
/**
 * Spacer -- fills available space or a fixed amount.
 *
 * Usage:
 *   <Row>
 *     <Text>Left</Text>
 *     <Spacer />           // Pushes Right to the end
 *     <Text>Right</Text>
 *   </Row>
 *
 *   <Column>
 *     <Text>Top</Text>
 *     <Spacer size={20} /> // Fixed 20px gap
 *     <Text>Bottom</Text>
 *   </Column>
 */
export function Spacer(props) {
    const { size, style, ...restProps } = props;
    const spacerStyle = size !== undefined
        ? { width: size, height: size, ...style }
        : { flex: 1, ...style };
    return createNode('Spacer', { ...restProps, style: spacerStyle }, [], // Spacer is a leaf node
    props.key);
}
//# sourceMappingURL=Spacer.js.map