/**
 * @jaw/components - Text
 *
 * Text display component.
 * Renders a text string with typography styles.
 * This is a leaf node -- it cannot contain child components.
 */

import type { JawNode, JawProps, JawStyle } from '@jaw/core';
import { createNode } from '@jaw/core';

export interface TextProps extends JawProps {
  style?: JawStyle;
  /** The text content to display. Can also be passed as children. */
  content?: string;
  children?: string | number;
}

/**
 * Text -- displays text content.
 *
 * Usage:
 *   <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Hello World</Text>
 *   // or
 *   <Text content="Hello World" style={{ color: '#fff' }} />
 */
export function Text(props: TextProps): JawNode {
  const { children, content, ...restProps } = props;

  // Resolve content: explicit content prop takes priority, then children
  const textContent = content ?? (
    typeof children === 'string' ? children :
    typeof children === 'number' ? String(children) :
    ''
  );

  return createNode(
    'Text',
    { ...restProps, content: textContent },
    [], // Text is a leaf node -- no children
    props.key,
  );
}
