/**
 * @jaw/components - Button
 *
 * Interactive button component.
 * Wraps content in a pressable container with event handling.
 */
import type { JawNode, JawProps, JawStyle, JawEventHandler } from '@jaw/core';
export interface ButtonProps extends JawProps {
    style?: JawStyle;
    /** Click/press handler */
    onPress?: JawEventHandler;
    /** Button label text (shorthand for a Text child) */
    label?: string;
    /** Whether the button is disabled */
    disabled?: boolean;
    children?: ReadonlyArray<JawNode>;
}
/**
 * Button -- interactive pressable element.
 *
 * Usage:
 *   <Button onPress={() => console.log('clicked')} label="Click Me" />
 *   // or with children:
 *   <Button onPress={handlePress} style={{ padding: 12 }}>
 *     <Text>Custom Content</Text>
 *   </Button>
 */
export declare function Button(props: ButtonProps): JawNode;
//# sourceMappingURL=Button.d.ts.map