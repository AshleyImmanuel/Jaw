import { createElement } from '@jaw/runtime';
/**
 * A generic interaction surface.
 * Does not provide default visual feedback (unlike Button).
 */
export function Pressable(props) {
    return createElement('Pressable', {
        style: props.style,
        onPress: props.disabled ? undefined : props.onPress,
        onPressIn: props.disabled ? undefined : props.onPressIn,
        onPressOut: props.disabled ? undefined : props.onPressOut,
        onLongPress: props.disabled ? undefined : props.onLongPress,
        testId: props.testId,
    }, ...(Array.isArray(props.children) ? props.children : (props.children ? [props.children] : [])));
}
//# sourceMappingURL=Pressable.js.map