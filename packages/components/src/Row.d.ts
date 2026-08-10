/**
 * @jaw/components - Row
 *
 * Horizontal layout container.
 * Children are laid out left-to-right along the main axis.
 * Equivalent to Box with flexDirection: 'row'.
 */
import type { JawNode, JawProps, JawStyle } from '@jaw/core';
export interface RowProps extends JawProps {
    style?: JawStyle;
    children?: ReadonlyArray<JawNode>;
}
/**
 * Row -- horizontal flex container.
 *
 * Usage:
 *   <Row style={{ gap: 8 }}>
 *     <Text>Left</Text>
 *     <Text>Right</Text>
 *   </Row>
 */
export declare function Row(props: RowProps): JawNode;
//# sourceMappingURL=Row.d.ts.map