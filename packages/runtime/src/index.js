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
// --- JSX Factory ---
export { createElement, Fragment } from './createElement';
// --- State Management ---
export { createState, createComponentContext, getOrCreateContext, setCurrentContext, getCurrentContext, destroyContext, __resetAllState, } from './state';
// --- Lifecycle ---
export { onMount, onUnmount, flushMountCallbacks } from './lifecycle';
// --- Effects ---
export { createEffect } from './effects';
// --- Event Dispatch ---
export { dispatchEvent, dispatchEventWithBubbling } from './events';
// --- Scheduler ---
export { scheduleUpdate, setRenderCallback, hasPendingUpdates, __flushSync, __resetScheduler, } from './scheduler';
// --- Jaw namespace (for JSX factory) ---
import { createElement, Fragment } from './createElement';
/**
 * The Jaw namespace.
 * TypeScript JSX is configured to call Jaw.createElement.
 * This object must be in scope wherever JSX is used.
 */
const Jaw = {
    createElement,
    Fragment,
};
export default Jaw;
//# sourceMappingURL=index.js.map