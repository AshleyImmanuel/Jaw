/**
 * @jaw/components - Text
 *
 * Text display component.
 * Renders a text string with typography styles.
 * This is a leaf node -- it cannot contain child components.
 */
import { createNode } from '@jaw/core';
/**
 * Text -- displays text content.
 *
 * Usage:
 *   <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Hello World</Text>
 *   // or
 *   <Text content="Hello World" style={{ color: '#fff' }} />
 */
export function Text(props) {
    const { children, content, ...restProps } = props;
    const textContent = content ?? (typeof children === 'string' ? children :
        typeof children === 'number' ? String(children) :
            (Array.isArray(children) && children.length > 0 && children[0].type === 'Text') ? String(children[0].props.content || '') :
                '');
    return createNode('Text', { ...restProps, content: textContent }, [], // Text is a leaf node -- no children
    props.key);
}
//# sourceMappingURL=Text.js.map