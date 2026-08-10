import { createElement } from '@jaw/runtime';
/**
 * SafeArea automatically adds padding to avoid physical device notches,
 * status bars, and home indicators on mobile devices.
 * On Web, it typically acts as a transparent passthrough unless
 * env(safe-area-inset) is supported by the WebRenderer.
 */
export function SafeArea(props) {
    return createElement('SafeArea', { style: props.style, testId: props.testId }, ...(Array.isArray(props.children) ? props.children : (props.children ? [props.children] : [])));
}
//# sourceMappingURL=SafeArea.js.map