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
import { scheduleUpdate } from './scheduler';
/** The currently active component context */
let currentContext = null;
/** Global context registry keyed by component instance ID */
const contextRegistry = new Map();
/** Auto-incrementing ID counter for component instances */
let nextContextId = 0;
/**
 * Create a new component context.
 * Called by the runtime before rendering a component.
 */
export function createComponentContext() {
    const id = `jaw_ctx_${nextContextId++}`;
    const context = {
        id,
        states: [],
        stateIndex: 0,
        mounted: false,
        mountCallbacks: [],
        unmountCallbacks: [],
        effects: [],
        effectIndex: 0,
        rerender: null,
    };
    contextRegistry.set(id, context);
    return context;
}
/**
 * Get or create a context for a component ID.
 */
export function getOrCreateContext(id) {
    let context = contextRegistry.get(id);
    if (!context) {
        context = {
            id,
            states: [],
            stateIndex: 0,
            mounted: false,
            mountCallbacks: [],
            unmountCallbacks: [],
            effects: [],
            effectIndex: 0,
            rerender: null,
        };
        contextRegistry.set(id, context);
    }
    return context;
}
/**
 * Set the current component context.
 * Called by the runtime before invoking a component function.
 */
export function setCurrentContext(context) {
    if (context) {
        context.stateIndex = 0;
        context.effectIndex = 0;
    }
    currentContext = context;
}
/**
 * Get the current component context.
 * Throws if called outside a component render.
 */
export function getCurrentContext() {
    if (!currentContext) {
        throw new Error('[Jaw] createState/onMount/createEffect must be called inside a component function.');
    }
    return currentContext;
}
/**
 * Destroy a component context and run unmount callbacks.
 */
export function destroyContext(id) {
    const context = contextRegistry.get(id);
    if (context) {
        // Run unmount callbacks
        for (const callback of context.unmountCallbacks) {
            try {
                callback();
            }
            catch (err) {
                console.error('[Jaw] Error in unmount callback:', err);
            }
        }
        // Run effect cleanups
        for (const effect of context.effects) {
            if (effect.cleanup) {
                try {
                    effect.cleanup();
                }
                catch (err) {
                    console.error('[Jaw] Error in effect cleanup:', err);
                }
            }
        }
        contextRegistry.delete(id);
    }
}
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
export function createState(initial) {
    const context = getCurrentContext();
    const index = context.stateIndex++;
    // First render: create the state slot
    if (index >= context.states.length) {
        const slot = {
            value: initial,
            setter: (next) => {
                const currentValue = slot.value;
                const newValue = typeof next === 'function'
                    ? next(currentValue)
                    : next;
                // Only update if value actually changed
                if (!Object.is(currentValue, newValue)) {
                    slot.value = newValue;
                    // Schedule re-render
                    if (context.rerender) {
                        scheduleUpdate(context.rerender);
                    }
                }
            },
        };
        context.states.push(slot);
    }
    const slot = context.states[index];
    return [() => slot.value, slot.setter];
}
/**
 * Reset all state -- used for testing.
 */
export function __resetAllState() {
    for (const [, context] of contextRegistry) {
        destroyContext(context.id);
    }
    contextRegistry.clear();
    nextContextId = 0;
    currentContext = null;
}
//# sourceMappingURL=state.js.map