/**
 * @jaw/runtime - Effects
 *
 * Provides createEffect() -- runs side effects when dependencies change.
 * Similar to React's useEffect but with explicit dependency tracking.
 */

import { getCurrentContext } from './state';

/**
 * Run a side effect when dependencies change.
 *
 * The effect callback runs after the component renders.
 * If deps change between renders, the previous cleanup runs
 * and the effect re-runs.
 *
 * Usage:
 *   createEffect(() => {
 *     document.title = `Count: ${count()}`;
 *     return () => { document.title = 'App'; };  // cleanup
 *   }, [count()]);
 *
 * @param callback - Effect function, optionally returns cleanup
 * @param deps - Dependency array (effect re-runs when deps change)
 */
export function createEffect(
  callback: () => void | (() => void),
  deps?: unknown[],
): void {
  const context = getCurrentContext();
  const index = context.effectIndex++;

  // First render: create effect slot
  if (index >= context.effects.length) {
    context.effects.push({
      deps,
      cleanup: undefined,
      callback,
    });
    // Run the effect after render (via microtask)
    queueMicrotask(() => {
      try {
        const cleanup = callback();
        if (context.effects[index]) {
          context.effects[index].cleanup = cleanup;
        }
      } catch (err) {
        console.error('[Jaw] Error in createEffect:', err);
      }
    });
    return;
  }

  // Subsequent renders: check if deps changed
  const slot = context.effects[index];

  if (depsChanged(slot.deps, deps)) {
    // Run previous cleanup
    if (slot.cleanup) {
      try {
        slot.cleanup();
      } catch (err) {
        console.error('[Jaw] Error in effect cleanup:', err);
      }
    }

    // Update slot
    slot.deps = deps;
    slot.callback = callback;

    // Run new effect after render
    queueMicrotask(() => {
      try {
        const cleanup = callback();
        slot.cleanup = cleanup;
      } catch (err) {
        console.error('[Jaw] Error in createEffect:', err);
      }
    });
  }
}

/**
 * Compare two dependency arrays.
 * Returns true if they differ (effect should re-run).
 */
function depsChanged(
  prev: unknown[] | undefined,
  next: unknown[] | undefined,
): boolean {
  // No deps = always run
  if (prev === undefined || next === undefined) return true;

  // Different lengths = changed
  if (prev.length !== next.length) return true;

  // Compare each dep
  for (let i = 0; i < prev.length; i++) {
    if (!Object.is(prev[i], next[i])) return true;
  }

  return false;
}
