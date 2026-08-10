import { Stack } from './Stack';
import { Box } from './Box';
import { Pressable } from './Pressable';
/**
 * A polished dialog overlay with backdrop blurring.
 * Mounts globally via Stack relative positioning.
 */
export function Modal(props) {
    if (!props.visible)
        return Box({ style: { width: 0, height: 0 } });
    return Stack({
        testId: props.testId,
        style: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
        },
        children: [
            // Backdrop (dismisses modal when pressed)
            Pressable({
                onPress: props.onClose,
                style: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    // In a full implementation, Jaw would support backdrop-filter: blur(4px)
                }
            }),
            // Modal Content Container
            Box({
                style: {
                    backgroundColor: 'white',
                    padding: { top: 24, bottom: 24, left: 24, right: 24 },
                    borderRadius: 16,
                    width: '80%',
                    maxWidth: 400,
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    ...(props.style || {})
                },
                children: Array.isArray(props.children) ? props.children : (props.children ? [props.children] : [])
            })
        ]
    });
}
//# sourceMappingURL=Modal.js.map