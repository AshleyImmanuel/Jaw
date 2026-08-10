import { Pressable } from './Pressable';
import { Box } from './Box';
/**
 * A fluid toggle switch component.
 */
export function Switch(props) {
    return Pressable({
        testId: props.testId,
        disabled: props.disabled,
        onPress: () => {
            if (props.onValueChange) {
                props.onValueChange(!props.value);
            }
        },
        style: {
            width: 50,
            height: 30,
            borderRadius: 15,
            backgroundColor: props.value ? '#22c55e' : '#e5e7eb',
            padding: { top: 2, bottom: 2, left: 2, right: 2 },
            justifyContent: 'center',
            alignItems: props.value ? 'end' : 'start',
            // Smooth transitions are automatically handled by Jaw Web Renderer!
            ...(props.style || {})
        },
        children: Box({
            style: {
                width: 26,
                height: 26,
                borderRadius: 13,
                backgroundColor: 'white',
                boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            }
        })
    });
}
//# sourceMappingURL=Switch.js.map