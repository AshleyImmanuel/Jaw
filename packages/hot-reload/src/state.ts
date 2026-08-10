/**
 * @jaw/hot-reload - State Preservation
 *
 * Serializes and restores component state across hot reloads.
 * For Beta 1, this uses sessionStorage as a simple persistence layer.
 */

const STATE_KEY = '__jaw_hmr_state__';

/**
 * Save the current application state before a hot reload.
 *
 * @param state - Serializable state object
 */
export function saveState(state: Record<string, unknown>): void {
  try {
    const serialized = JSON.stringify(state);
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem(STATE_KEY, serialized);
    }
  } catch (err) {
    console.warn('[Jaw HMR] Failed to save state:', err);
  }
}

/**
 * Restore saved state after a hot reload.
 *
 * @returns The restored state, or null if none exists
 */
export function restoreState(): Record<string, unknown> | null {
  try {
    if (typeof sessionStorage !== 'undefined') {
      const serialized = sessionStorage.getItem(STATE_KEY);
      if (serialized) {
        sessionStorage.removeItem(STATE_KEY);
        return JSON.parse(serialized);
      }
    }
  } catch (err) {
    console.warn('[Jaw HMR] Failed to restore state:', err);
  }
  return null;
}

/**
 * Clear any saved HMR state.
 */
export function clearState(): void {
  try {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem(STATE_KEY);
    }
  } catch {
    // Ignore
  }
}
