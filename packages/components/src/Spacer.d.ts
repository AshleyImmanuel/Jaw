/**
 * @jaw/components - Spacer
 *
 * Flexible space component.
 * Takes up remaining space in a flex container, or a fixed size.
 */
import type { JawNode, JawProps, JawStyle } from '@jaw/core';
export interface SpacerProps extends JawProps {
    /** Fixed size in pixels. If omitted, spacer uses flex: 1. */
    size?: number;
    style?: JawStyle;
}
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
export declare function Spacer(props: SpacerProps): JawNode;
//# sourceMappingURL=Spacer.d.ts.map