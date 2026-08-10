import type { JawNode, LayoutBox, Renderer, RendererConfig, RendererEventCallback } from '@jaw/core';
export type { AndroidRenderNode } from './serializer';
export { serializeRenderPlan } from './serializer';
export { MessageBridge } from './bridge';
export declare class AndroidRenderer implements Renderer {
    readonly name = "android";
    private bridge;
    private currentTree;
    private eventCallback;
    private config;
    private unsubscribe;
    constructor(config?: RendererConfig);
    /**
     * Mount a layout tree and send it to the Native host.
     */
    mount(tree: LayoutBox, container: unknown): void;
    /**
     * Update the layout tree.
     * Currently, we just send the whole new tree to Native.
     * In the future, we could diff it here and send a patch instruction.
     */
    update(oldTree: LayoutBox, newTree: LayoutBox): void;
    /**
     * Unmount and clean up.
     */
    unmount(): void;
    /**
     * Register event callback for renderer-to-runtime communication.
     */
    onEvent(callback: RendererEventCallback): void;
    private sendRenderPlan;
}
/**
 * High-level render API for Jaw Android applications.
 *
 * @param rootNode - The root JawNode of the app
 * @param width - The logical width of the Android device screen
 * @param height - The logical height of the Android device screen
 */
export declare function render(rootNode: JawNode, width: number, height: number): (newNode: JawNode) => void;
//# sourceMappingURL=index.d.ts.map