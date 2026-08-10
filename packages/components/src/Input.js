import { createElement } from '@jaw/runtime';
/**
 * Basic text input component.
 * Maps to <input type="text"> on Web, and EditText on Android.
 */
export function Input(props) {
    return createElement('Input', {
        style: props.style,
        value: props.value,
        placeholder: props.placeholder,
        editable: props.editable !== false,
        disabled: props.disabled === true,
        onChangeText: props.onChangeText,
        onSubmit: props.onSubmit,
        testId: props.testId,
    });
}
//# sourceMappingURL=Input.js.map