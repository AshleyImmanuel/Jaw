/**
 * @jaw/hot-reload - State Preservation
 *
 * Serializes and restores component state across hot reloads.
 * For Beta 1, this uses sessionStorage as a simple persistence layer.
 */
/**
 * Save the current application state before a hot reload.
 *
 * @param state - Serializable state object
 */
export declare function saveState(state: Record<string, unknown>): void;
/**
 * Restore saved state after a hot reload.
 *
 * @returns The restored state, or null if none exists
 */
export declare function restoreState(): Record<string, unknown> | null;
/**
 * Clear any saved HMR state.
 */
export declare function clearState(): void;
//# sourceMappingURL=state.d.ts.map