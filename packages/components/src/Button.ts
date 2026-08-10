/**
 * @jaw/components - Button
 *
 * Interactive button component.
 * Wraps content in a pressable container with event handling.
 */

import type { JawNode, JawProps, JawStyle, JawEventHandler } from '@jaw/core';
import { createNode } from '@jaw/core';

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
export function Button(props: ButtonProps): JawNode {
  const { children = [], label, disabled, ...restProps } = props;

  // If label is provided and no children, create a Text child
  let resolvedChildren: JawNode[];
  if (label && (!Array.isArray(children) || children.length === 0)) {
    resolvedChildren = [
      createNode('Text', { content: label }, [], undefined),
    ];
  } else {
    resolvedChildren = Array.isArray(children) ? children as JawNode[] : [];
  }

  // If disabled, remove the press handler
  const resolvedProps = { ...restProps };
  if (disabled) {
    delete resolvedProps.onPress;
    (resolvedProps as ButtonProps).disabled = true;
  }

  return createNode(
    'Button',
    resolvedProps,
    resolvedChildren,
    props.key,
  );
}
