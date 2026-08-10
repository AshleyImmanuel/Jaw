/**
 * @jaw/runtime
 *
 * The Jaw runtime provides the core engine for building Jaw applications:
 * - createElement: JSX factory
 * - createState: Reactive state management
 * - onMount/onUnmount: Lifecycle hooks
 * - createEffect: Side effects with dependency tracking
 * - Event dispatch
 * - Render scheduling
 *
 * The runtime is the "Jaw" object that JSX compiles against.
 */
export { createElement, Fragment } from './createElement';
export { createState, createComponentContext, getOrCreateContext, setCurrentContext, getCurrentContext, destroyContext, __resetAllState, __resetComponentCounters, } from './state';
export { onMount, onUnmount, flushMountCallbacks } from './lifecycle';
export { createEffect } from './effects';
export { dispatchEvent, dispatchEventWithBubbling } from './events';
export { scheduleUpdate, setRenderCallback, hasPendingUpdates, __flushSync, __resetScheduler, } from './scheduler';
import { createElement } from './createElement';
import { createState } from './state';
/**
 * The Jaw namespace.
 * TypeScript JSX is configured to call Jaw.createElement.
 * This object must be in scope wherever JSX is used.
 */
declare const Jaw: {
    createElement: typeof createElement;
    Fragment: string;
    createState: typeof createState;
};
export default Jaw;
//# sourceMappingURL=index.d.ts.map