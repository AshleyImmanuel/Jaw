import type { JawNode, JawStyle } from '@jaw/core';
export interface SwitchProps {
    value: boolean;
    onValueChange?: (value: boolean) => void;
    disabled?: boolean;
    style?: JawStyle;
    testId?: string;
}
/**
 * A fluid toggle switch component.
 */
export declare function Switch(props: SwitchProps): JawNode;
//# sourceMappingURL=Switch.d.ts.map