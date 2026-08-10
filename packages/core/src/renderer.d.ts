/**
 * @jaw/core - Renderer Interface
 *
 * Defines the contract that all platform renderers must implement.
 * Beta 1 ships with a Web (DOM) renderer.
 * Future: Android, iOS, Desktop renderers.
 */
import type { LayoutBox } from './layout';
import type { JawNode } from './node';
/**
 * The renderer interface.
 *
 * Every platform renderer (Web, Android, iOS, Desktop) must implement
 * this interface. The runtime calls these methods; the renderer translates
 * them into platform-specific operations.
 */
export interface Renderer {
    /** Unique identifier for this renderer (e.g., 'web', 'android') */
    readonly name: string;
    /**
     * Mount a layout tree into a platform container.
     * Called once when the app first renders.
     */
    mount(tree: LayoutBox, container: unknown): void;
    /**
     * Update the rendered output with a new layout tree.
     * The renderer should diff against the previous tree and apply
     * minimal mutations.
     */
    update(oldTree: LayoutBox, newTree: LayoutBox): void;
    /**
     * Unmount the rendered output and clean up all resources.
     */
    unmount(): void;
    /**
     * Register a callback that the renderer calls when a platform event
     * occurs that should be dispatched through the Jaw event system.
     */
    onEvent(callback: RendererEventCallback): void;
}
/**
 * Callback type for renderer-to-runtime event communication.
 * The renderer calls this with a Jaw event type and the target node.
 */
export type RendererEventCallback = (eventType: string, targetNode: JawNode, nativeEvent: unknown) => void;
/**
 * Configuration for initializing a renderer.
 */
export interface RendererConfig {
    /** Enable debug overlay showing layout boxes */
    debug?: boolean;
    /** Enable performance profiling */
    profile?: boolean;
}
//# sourceMappingURL=renderer.d.ts.map