import { createState, createEffect } from '@jaw/runtime';
import { Stack } from './Stack';
import { Box } from './Box';
import { Text } from './Text';
// Global Signal for the active toasts
let activeToasts = [];
let setToasts = null;
let toastIdCounter = 0;
/**
 * Imperative API to spawn a Toast from anywhere in the app.
 * Relies on the O(1) Signal reactivity engine.
 */
export function toast(message, type = 'info', duration = 3000) {
    if (!setToasts) {
        console.warn('[Jaw] ToastProvider not found in the component tree. Toast ignored.');
        return;
    }
    const id = `toast-${toastIdCounter++}`;
    const newToast = { id, message, type, duration };
    activeToasts = [...activeToasts, newToast];
    setToasts(activeToasts);
    setTimeout(() => {
        activeToasts = activeToasts.filter((t) => t.id !== id);
        if (setToasts)
            setToasts(activeToasts);
    }, duration);
}
/**
 * The global Toast overlay provider.
 * Should be mounted at the very top of your application tree.
 */
export function ToastProvider() {
    const [toasts, setToastsSignal] = createState([]);
    createEffect(() => {
        setToasts = setToastsSignal;
        return () => { setToasts = null; };
    }, []);
    const currentToasts = toasts();
    if (currentToasts.length === 0)
        return Box({ style: { width: 0, height: 0 } });
    return Stack({
        style: {
            position: 'absolute',
            bottom: 40,
            left: 0,
            right: 0,
            alignItems: 'center',
            justifyContent: 'end',
            pointerEvents: 'none',
        },
        children: currentToasts.map((t) => Box({
            testId: t.id,
            style: {
                backgroundColor: t.type === 'error' ? '#ef4444' : t.type === 'success' ? '#22c55e' : '#3b82f6',
                padding: { top: 12, bottom: 12, left: 24, right: 24 },
                borderRadius: 8,
                margin: { bottom: 8 },
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                // Aesthetic smooth entry animation (handled by web renderer CSS transition for now)
                opacity: 1,
            },
            children: [
                Text({
                    content: t.message,
                    style: { color: 'white', fontWeight: 'bold' }
                })
            ]
        }))
    });
}
//# sourceMappingURL=Toast.js.map