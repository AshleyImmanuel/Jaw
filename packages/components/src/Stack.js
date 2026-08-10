import { createElement } from '@jaw/runtime';
/**
 * Stack layers its children directly on top of one another.
 * Useful for overlays, absolute positioning wrappers, and Toasts.
 */
export function Stack(props) {
    return createElement('Stack', { style: props.style, testId: props.testId }, ...(props.children || []));
}
//# sourceMappingURL=Stack.js.map