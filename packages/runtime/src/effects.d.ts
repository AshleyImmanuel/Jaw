/**
 * @jaw/runtime - Effects
 *
 * Provides createEffect() -- runs side effects when dependencies change.
 * Similar to React's useEffect but with explicit dependency tracking.
 */
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
export declare function createEffect(callback: () => void | (() => void), deps?: unknown[]): void;
//# sourceMappingURL=effects.d.ts.map