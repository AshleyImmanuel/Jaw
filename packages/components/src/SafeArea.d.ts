import type { JawNode, JawStyle } from '@jaw/core';
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
export declare function SafeArea(props: SafeAreaProps): JawNode;
//# sourceMappingURL=SafeArea.d.ts.map