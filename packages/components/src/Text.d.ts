/**
 * @jaw/components - Text
 *
 * Text display component.
 * Renders a text string with typography styles.
 * This is a leaf node -- it cannot contain child components.
 */
import type { JawNode, JawProps, JawStyle } from '@jaw/core';
export interface TextProps extends JawProps {
    style?: JawStyle;
    /** The text content to display. Can also be passed as children. */
    content?: string;
    children?: string | number | ReadonlyArray<JawNode>;
}
/**
 * Text -- displays text content.
 *
 * Usage:
 *   <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Hello World</Text>
 *   // or
 *   <Text content="Hello World" style={{ color: '#fff' }} />
 */
export declare function Text(props: TextProps): JawNode;
//# sourceMappingURL=Text.d.ts.map