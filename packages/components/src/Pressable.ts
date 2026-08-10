import type { JawNode, JawStyle } from '@jaw/core';
import { createElement } from '@jaw/runtime';

export interface PressableProps {
  style?: JawStyle;
  children?: JawNode | JawNode[];
  onPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  onLongPress?: () => void;
  disabled?: boolean;
  testId?: string;
}

/**
 * A generic interaction surface.
 * Does not provide default visual feedback (unlike Button).
 */
export function Pressable(props: PressableProps): JawNode {
  return createElement(
    'Pressable',
    {
      style: props.style,
      onPress: props.disabled ? undefined : props.onPress,
      onPressIn: props.disabled ? undefined : props.onPressIn,
      onPressOut: props.disabled ? undefined : props.onPressOut,
      onLongPress: props.disabled ? undefined : props.onLongPress,
      testId: props.testId,
    },
    ...(Array.isArray(props.children) ? props.children : (props.children ? [props.children] : []))
  );
}
