/**
 * @jaw/runtime - Render Scheduler
 *
 * Batches state updates and flushes them in a single render pass.
 * Prevents redundant re-renders when multiple state changes happen
 * in the same synchronous block.
 *
 * Uses microtask scheduling (queueMicrotask) for batching.
 */
/**
 * Schedule an update to run in the next microtask batch.
 *
 * Multiple calls within the same synchronous block are batched
 * into a single render pass.
 *
 * @param update - Function to run during the update flush
 */
export declare function scheduleUpdate(update: () => void): void;
/**
 * Register the application's render function.
 * Called once during app initialization.
 *
 * @param callback - Function that re-renders the entire app
 */
export declare function setRenderCallback(callback: () => void): void;
/**
 * Check if there are pending updates waiting to flush.
 */
export declare function hasPendingUpdates(): boolean;
/**
 * Force-flush all pending updates synchronously.
 * Used for testing only -- not recommended in production.
 */
export declare function __flushSync(): void;
/**
 * Reset scheduler state -- used for testing.
 */
export declare function __resetScheduler(): void;
//# sourceMappingURL=scheduler.d.ts.map