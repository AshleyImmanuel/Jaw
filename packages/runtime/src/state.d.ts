/**
 * @jaw/runtime - State Management
 *
 * Provides createState() -- the Jaw equivalent of React's useState.
 * State changes trigger re-renders through the scheduler.
 *
 * Design: Hook-like call-order-based state tracking.
 * Each component invocation gets a "fiber" context that tracks
 * which state slots have been allocated.
 */
/**
 * A state slot stores the current value and its setter.
 */
interface StateSlot<T = unknown> {
    value: T;
    setter: (next: T | ((prev: T) => T)) => void;
    subscribers: Set<ComponentContext | EffectSlot>;
}
/**
 * Component context -- tracks state for the currently rendering component.
 * This is set by the runtime before calling a component function.
 */
interface ComponentContext {
    /** Unique ID for this component instance */
    id: string;
    /** State slots, indexed by call order */
    states: StateSlot[];
    /** Current state index during rendering */
    stateIndex: number;
    /** Whether this component has been mounted */
    mounted: boolean;
    /** Lifecycle callbacks */
    mountCallbacks: Array<() => void | (() => void)>;
    unmountCallbacks: Array<() => void>;
    /** Effect tracking */
    effects: EffectSlot[];
    effectIndex: number;
    /** Re-render trigger */
    rerender: (() => void) | null;
}
interface EffectSlot {
    deps: unknown[] | undefined;
    cleanup: (() => void) | void;
    callback: () => void | (() => void);
}
/** The currently active effect slot (for fine-grained reactivity) */
export declare let currentEffectSubscriber: EffectSlot | null;
export declare function setCurrentEffectSubscriber(effect: EffectSlot | null): void;
export declare function __resetComponentCounters(): void;
export declare function getNextComponentId(name: string, key?: string | number): string;
/**
 * Create a new component context.
 * Called by the runtime before rendering a component.
 */
export declare function createComponentContext(): ComponentContext;
/**
 * Get or create a context for a component ID.
 */
export declare function getOrCreateContext(id: string): ComponentContext;
/**
 * Set the current component context.
 * Called by the runtime before invoking a component function.
 */
export declare function setCurrentContext(context: ComponentContext | null): void;
/**
 * Get the current component context.
 * Throws if called outside a component render.
 */
export declare function getCurrentContext(): ComponentContext;
/**
 * Get the current component context or null.
 * Used internally by the runtime.
 */
export declare function getCurrentContextOrNull(): ComponentContext | null;
/**
 * Destroy a component context and run unmount callbacks.
 */
export declare function destroyContext(id: string): void;
/**
 * Create a reactive state value.
 *
 * Usage:
 *   const [count, setCount] = createState(0);
 *   // count() returns current value
 *   // setCount(1) or setCount(prev => prev + 1) updates and triggers re-render
 *
 * @param initial - The initial state value
 * @returns A tuple of [getter, setter]
 */
export declare function createState<T>(initial: T): [() => T, (next: T | ((prev: T) => T)) => void];
/**
 * Reset all state -- used for testing.
 */
export declare function __resetAllState(): void;
export {};
//# sourceMappingURL=state.d.ts.map