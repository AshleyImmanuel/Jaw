import type { JawNode, JawStyle } from '@jaw/core';
export interface StackProps {
    style?: JawStyle;
    children?: JawNode[];
    testId?: string;
}
/**
 * Stack layers its children directly on top of one another.
 * Useful for overlays, absolute positioning wrappers, and Toasts.
 */
export declare function Stack(props: StackProps): JawNode;
//# sourceMappingURL=Stack.d.ts.map