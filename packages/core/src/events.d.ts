/**
 * @jaw/core - Event Types
 *
 * Defines the Jaw event system.
 * Jaw events are platform-agnostic -- renderers translate native events
 * (DOM click, Android tap, etc.) into JawEvents before dispatching.
 */
/** All supported Jaw event types */
export type JawEventType = 'press' | 'longPress' | 'pressIn' | 'pressOut' | 'focus' | 'blur' | 'layout' | 'scroll' | 'textChange';
/**
 * A platform-agnostic event.
 * Renderers create these from native events before dispatching to handlers.
 */
export interface JawEvent {
    /** The type of event */
    readonly type: JawEventType;
    /** Timestamp when the event occurred (ms since epoch) */
    readonly timestamp: number;
    /** The target node that received the event */
    readonly target: string | null;
    /** Whether the event has been consumed (stops bubbling) */
    consumed: boolean;
    /** Prevent further propagation */
    stopPropagation(): void;
    /** Platform-specific native event (if available) */
    readonly nativeEvent?: unknown;
}
/** Handler function for Jaw events */
export type JawEventHandler = (event: JawEvent) => void;
/**
 * Create a new JawEvent instance.
 * Used by renderers to convert native events.
 */
export declare function createJawEvent(type: JawEventType, target?: string | null, nativeEvent?: unknown): JawEvent;
/**
 * Map of Jaw event types to their handler prop names.
 * Used by renderers to look up which prop to invoke.
 */
export declare const EVENT_HANDLER_MAP: Record<JawEventType, string>;
//# sourceMappingURL=events.d.ts.map