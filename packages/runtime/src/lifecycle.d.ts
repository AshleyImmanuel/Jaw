/**
 * @jaw/runtime - Lifecycle Hooks
 *
 * Provides onMount and onUnmount lifecycle hooks.
 * These register callbacks on the current component context.
 */
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
export declare function onMount(callback: () => void | (() => void)): void;
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
export declare function onUnmount(callback: () => void): void;
/**
 * Flush mount callbacks for a component context.
 * Called by the runtime after a component's first render commits to the screen.
 */
export declare function flushMountCallbacks(contextId: string): void;
//# sourceMappingURL=lifecycle.d.ts.map