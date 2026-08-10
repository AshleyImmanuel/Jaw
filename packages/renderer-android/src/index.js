import { computeLayout } from '@jaw/layout';
import { serializeRenderPlan } from './serializer';
import { MessageBridge } from './bridge';
export { serializeRenderPlan } from './serializer';
export { MessageBridge } from './bridge';
/**
 * The Android Native Renderer.
 *
 * Implements the Renderer interface for Native Android.
 * Instead of mounting to a DOM, it serializes the LayoutBox tree
 * and sends it over a MessageBridge to the native host.
 */
/**
 * Quickly traverses the LayoutBox tree using the index path embedded in the ID.
 * Example ID: "root-0-2-1" -> root.children[0].children[2].children[1]
 */
function findNodeById(tree, id) {
    if (id === 'root')
        return tree.node;
    if (!id.startsWith('root-'))
        return null;
    const indices = id.split('-').slice(1).map(Number);
    let current = tree;
    for (const index of indices) {
        if (!current || !current.children)
            return null;
        current = current.children[index];
    }
    return current ? current.node : null;
}
export class AndroidRenderer {
    name = 'android';
    bridge;
    currentTree = null;
    eventCallback = null;
    config;
    unsubscribe = null;
    constructor(config = {}) {
        this.config = config;
        this.bridge = new MessageBridge();
    }
    /**
     * Mount a layout tree and send it to the Native host.
     */
    mount(tree, container) {
        this.currentTree = tree;
        // Subscribe to incoming events from the native UI
        this.unsubscribe = this.bridge.subscribe((message) => {
            if (message.type === 'EVENT' && this.eventCallback && this.currentTree && message.payload.target) {
                const targetNode = findNodeById(this.currentTree, message.payload.target);
                if (targetNode) {
                    this.eventCallback(message.payload.type, targetNode, message.payload.nativeEvent);
                }
            }
        });
        this.sendRenderPlan(tree);
    }
    /**
     * Update the layout tree.
     * Currently, we just send the whole new tree to Native.
     * In the future, we could diff it here and send a patch instruction.
     */
    update(oldTree, newTree) {
        this.currentTree = newTree;
        this.sendRenderPlan(newTree);
    }
    /**
     * Unmount and clean up.
     */
    unmount() {
        this.currentTree = null;
        if (this.unsubscribe) {
            this.unsubscribe();
            this.unsubscribe = null;
        }
    }
    /**
     * Register event callback for renderer-to-runtime communication.
     */
    onEvent(callback) {
        this.eventCallback = callback;
    }
    sendRenderPlan(tree) {
        const renderPlan = serializeRenderPlan(tree);
        this.bridge.send({
            type: 'RENDER',
            payload: renderPlan,
        });
    }
}
/**
 * High-level render API for Jaw Android applications.
 *
 * @param rootNode - The root JawNode of the app
 * @param width - The logical width of the Android device screen
 * @param height - The logical height of the Android device screen
 */
export function render(rootNode, width, height) {
    const renderer = new AndroidRenderer();
    let currentRootNode = rootNode;
    // NOTE: In the future, measureText will be an async/sync call to the native bridge.
    // For now, we will leave it undefined to let the layout engine fallback to bounds.
    const doRender = () => {
        const layout = computeLayout(currentRootNode, width, height);
        renderer.update(layout, layout); // Native handles its own view diffing for now
    };
    const initialLayout = computeLayout(currentRootNode, width, height);
    renderer.mount(initialLayout, null);
    return (newNode) => {
        currentRootNode = newNode;
        doRender();
    };
}
//# sourceMappingURL=index.js.map