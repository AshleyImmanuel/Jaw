import type { JawNode, JawStyle } from '@jaw/core';
import { createElement } from '@jaw/runtime';

export interface SafeAreaProps {
  style?: JawStyle;
  children?: JawNode | JawNode[];
  testId?: string;
}

/**
 * SafeArea automatically adds padding to avoid physical device notches,
 * status bars, and home indicators on mobile devices.
 * On Web, it typically acts as a transparent passthrough unless 
 * env(safe-area-inset) is supported by the WebRenderer.
 */
export function SafeArea(props: SafeAreaProps): JawNode {
  return createElement(
    'SafeArea',
    { style: props.style, testId: props.testId },
    ...(Array.isArray(props.children) ? props.children : (props.children ? [props.children] : []))
  );
}
