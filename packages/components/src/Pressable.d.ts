import type { JawNode, JawStyle } from '@jaw/core';
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
export declare function Pressable(props: PressableProps): JawNode;
//# sourceMappingURL=Pressable.d.ts.map