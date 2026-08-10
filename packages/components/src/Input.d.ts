import type { JawNode, JawStyle } from '@jaw/core';
export interface InputProps {
    value?: string;
    placeholder?: string;
    editable?: boolean;
    disabled?: boolean;
    style?: JawStyle;
    onChangeText?: (text: string) => void;
    onSubmit?: () => void;
    testId?: string;
}
/**
 * Basic text input component.
 * Maps to <input type="text"> on Web, and EditText on Android.
 */
export declare function Input(props: InputProps): JawNode;
//# sourceMappingURL=Input.d.ts.map