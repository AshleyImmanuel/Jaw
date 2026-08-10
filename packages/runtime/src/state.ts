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

/**
 * A state slot stores the current value and its setter.
 */
interface StateSlot<T = unknown> {
  value: T;
  setter: (next: T | ((prev: T) => T)) => void;
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

/** The currently active component context */
let currentContext: ComponentContext | null = null;

/** Global context registry keyed by component instance ID */
const contextRegistry = new Map<string, ComponentContext>();

/** Auto-incrementing ID counter for component instances */
let nextContextId = 0;

/**
 * Create a new component context.
 * Called by the runtime before rendering a component.
 */
export function createComponentContext(): ComponentContext {
  const id = `jaw_ctx_${nextContextId++}`;
  const context: ComponentContext = {
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
export function getOrCreateContext(id: string): ComponentContext {
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
export function setCurrentContext(context: ComponentContext | null): void {
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
export function getCurrentContext(): ComponentContext {
  if (!currentContext) {
    throw new Error(
      '[Jaw] createState/onMount/createEffect must be called inside a component function.'
    );
  }
  return currentContext;
}

/**
 * Destroy a component context and run unmount callbacks.
 */
export function destroyContext(id: string): void {
  const context = contextRegistry.get(id);
  if (context) {
    // Run unmount callbacks
    for (const callback of context.unmountCallbacks) {
      try {
        callback();
      } catch (err) {
        console.error('[Jaw] Error in unmount callback:', err);
      }
    }
    // Run effect cleanups
    for (const effect of context.effects) {
      if (effect.cleanup) {
        try {
          effect.cleanup();
        } catch (err) {
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
export function createState<T>(initial: T): [() => T, (next: T | ((prev: T) => T)) => void] {
  const context = getCurrentContext();
  const index = context.stateIndex++;

  // First render: create the state slot
  if (index >= context.states.length) {
    const slot: StateSlot<T> = {
      value: initial,
      setter: (next: T | ((prev: T) => T)) => {
        const currentValue = slot.value;
        const newValue = typeof next === 'function'
          ? (next as (prev: T) => T)(currentValue)
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
    context.states.push(slot as StateSlot);
  }

  const slot = context.states[index] as StateSlot<T>;
  return [() => slot.value, slot.setter];
}

/**
 * Reset all state -- used for testing.
 */
export function __resetAllState(): void {
  for (const [, context] of contextRegistry) {
    destroyContext(context.id);
  }
  contextRegistry.clear();
  nextContextId = 0;
  currentContext = null;
}
