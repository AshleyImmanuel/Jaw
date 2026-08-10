/**
 * @jaw/components - Button
 *
 * Interactive button component.
 * Wraps content in a pressable container with event handling.
 */
import { createNode } from '@jaw/core';
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
export function Button(props) {
    const { children = [], label, disabled, ...restProps } = props;
    // If label is provided and no children, create a Text child
    let resolvedChildren;
    if (label && (!Array.isArray(children) || children.length === 0)) {
        resolvedChildren = [
            createNode('Text', { content: label }, [], undefined),
        ];
    }
    else {
        resolvedChildren = Array.isArray(children) ? children : [];
    }
    // If disabled, remove the press handler
    const resolvedProps = { ...restProps };
    if (disabled) {
        delete resolvedProps.onPress;
        resolvedProps.disabled = true;
    }
    return createNode('Button', resolvedProps, resolvedChildren, props.key);
}
//# sourceMappingURL=Button.js.map