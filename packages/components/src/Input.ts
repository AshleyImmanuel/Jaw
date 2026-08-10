import type { JawNode, JawStyle } from '@jaw/core';
import { createElement } from '@jaw/runtime';

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
export function Input(props: InputProps): JawNode {
  return createElement(
    'Input',
    {
      style: props.style,
      value: props.value,
      placeholder: props.placeholder,
      editable: props.editable !== false,
      disabled: props.disabled === true,
      onChangeText: props.onChangeText,
      onSubmit: props.onSubmit,
      testId: props.testId,
    }
  );
}
