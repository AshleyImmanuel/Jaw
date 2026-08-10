/**
 * @jaw/core - Event Types
 *
 * Defines the Jaw event system.
 * Jaw events are platform-agnostic -- renderers translate native events
 * (DOM click, Android tap, etc.) into JawEvents before dispatching.
 */
/**
 * Create a new JawEvent instance.
 * Used by renderers to convert native events.
 */
export function createJawEvent(type, target = null, nativeEvent) {
    let consumed = false;
    return {
        type,
        timestamp: Date.now(),
        target,
        get consumed() {
            return consumed;
        },
        set consumed(value) {
            consumed = value;
        },
        stopPropagation() {
            consumed = true;
        },
        nativeEvent,
    };
}
/**
 * Map of Jaw event types to their handler prop names.
 * Used by renderers to look up which prop to invoke.
 */
export const EVENT_HANDLER_MAP = {
    press: 'onPress',
    longPress: 'onLongPress',
    pressIn: 'onPressIn',
    pressOut: 'onPressOut',
    focus: 'onFocus',
    blur: 'onBlur',
    layout: 'onLayout',
    scroll: 'onScroll',
    textChange: 'onTextChange',
};
//# sourceMappingURL=events.js.map