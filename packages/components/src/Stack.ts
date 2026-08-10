import type { JawNode, JawStyle } from '@jaw/core';
import { createElement } from '@jaw/runtime';
import { Box } from './Box';

export interface StackProps {
  style?: JawStyle;
  children?: JawNode[];
  testId?: string;
}

/**
 * Stack layers its children directly on top of one another.
 * Useful for overlays, absolute positioning wrappers, and Toasts.
 */
export function Stack(props: StackProps): JawNode {
  return createElement(
    'Stack',
    { style: props.style, testId: props.testId },
    ...(props.children || [])
  );
}
