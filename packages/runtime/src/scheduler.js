/**
 * @jaw/runtime - Render Scheduler
 *
 * Batches state updates and flushes them in a single render pass.
 * Prevents redundant re-renders when multiple state changes happen
 * in the same synchronous block.
 *
 * Uses microtask scheduling (queueMicrotask) for batching.
 */
/** Queue of pending update functions */
let pendingUpdates = [];
/** Whether a flush is already scheduled */
let flushScheduled = false;
/** The render callback set by the application */
let renderCallback = null;
/**
 * Schedule an update to run in the next microtask batch.
 *
 * Multiple calls within the same synchronous block are batched
 * into a single render pass.
 *
 * @param update - Function to run during the update flush
 */
export function scheduleUpdate(update) {
    pendingUpdates.push(update);
    if (!flushScheduled) {
        flushScheduled = true;
        queueMicrotask(flushUpdates);
    }
}
/**
 * Flush all pending updates and trigger a re-render.
 * This runs as a microtask after all synchronous state changes.
 */
function flushUpdates() {
    flushScheduled = false;
    // Copy and clear the queue (updates during flush go to next batch)
    const updates = pendingUpdates;
    pendingUpdates = [];
    // Execute all pending updates
    for (const update of updates) {
        try {
            update();
        }
        catch (err) {
            console.error('[Jaw] Error during scheduled update:', err);
        }
    }
    // Trigger a re-render if a render callback is registered
    if (renderCallback) {
        try {
            renderCallback();
        }
        catch (err) {
            console.error('[Jaw] Error during render:', err);
        }
    }
}
/**
 * Register the application's render function.
 * Called once during app initialization.
 *
 * @param callback - Function that re-renders the entire app
 */
export function setRenderCallback(callback) {
    renderCallback = callback;
}
/**
 * Check if there are pending updates waiting to flush.
 */
export function hasPendingUpdates() {
    return pendingUpdates.length > 0 || flushScheduled;
}
/**
 * Force-flush all pending updates synchronously.
 * Used for testing only -- not recommended in production.
 */
export function __flushSync() {
    if (flushScheduled) {
        flushScheduled = false;
        const updates = pendingUpdates;
        pendingUpdates = [];
        for (const update of updates) {
            try {
                update();
            }
            catch (err) {
                console.error('[Jaw] Error during sync flush:', err);
            }
        }
        if (renderCallback) {
            renderCallback();
        }
    }
}
/**
 * Reset scheduler state -- used for testing.
 */
export function __resetScheduler() {
    pendingUpdates = [];
    flushScheduled = false;
    renderCallback = null;
}
//# sourceMappingURL=scheduler.js.map