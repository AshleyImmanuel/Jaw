/**
 * @jaw/runtime - Lifecycle Hooks
 *
 * Provides onMount and onUnmount lifecycle hooks.
 * These register callbacks on the current component context.
 */

import { getCurrentContext } from './state';

/**
 * Register a callback to run after the component mounts.
 *
 * The callback may optionally return a cleanup function
 * that runs when the component unmounts.
 *
 * Usage:
 *   onMount(() => {
 *     const timer = setInterval(() => tick(), 1000);
 *     return () => clearInterval(timer);  // cleanup
 *   });
 *
 * @param callback - Function to run on mount, optionally returns cleanup
 */
export function onMount(callback: () => void | (() => void)): void {
  const context = getCurrentContext();

  // Only register on first render
  if (!context.mounted) {
    context.mountCallbacks.push(callback);
  }
}

/**
 * Register a callback to run when the component unmounts.
 *
 * Usage:
 *   onUnmount(() => {
 *     socket.disconnect();
 *   });
 *
 * @param callback - Function to run on unmount
 */
export function onUnmount(callback: () => void): void {
  const context = getCurrentContext();

  // Only register on first render
  if (!context.mounted) {
    context.unmountCallbacks.push(callback);
  }
}

/**
 * Flush mount callbacks for a component context.
 * Called by the runtime after a component's first render commits to the screen.
 */
export function flushMountCallbacks(contextId: string): void {
  // Import here to avoid circular dependency
  const { getOrCreateContext } = require('./state');
  const context = getOrCreateContext(contextId);

  if (!context.mounted) {
    context.mounted = true;
    for (const callback of context.mountCallbacks) {
      try {
        const cleanup = callback();
        if (typeof cleanup === 'function') {
          context.unmountCallbacks.push(cleanup);
        }
      } catch (err) {
        console.error('[Jaw] Error in onMount callback:', err);
      }
    }
  }
}
