/**
 * @jaw/components - Box
 *
 * The fundamental container component.
 * Box is a generic flex container that can hold any children.
 * Default flex direction: column.
 */
import type { JawNode, JawProps, JawStyle } from '@jaw/core';
export interface BoxProps extends JawProps {
    style?: JawStyle;
    children?: ReadonlyArray<JawNode>;
}
/**
 * Box -- generic flex container.
 *
 * Usage:
 *   <Box style={{ width: 200, height: 100, backgroundColor: '#333' }}>
 *     <Text>Hello</Text>
 *   </Box>
 */
export declare function Box(props: BoxProps): JawNode;
//# sourceMappingURL=Box.d.ts.map