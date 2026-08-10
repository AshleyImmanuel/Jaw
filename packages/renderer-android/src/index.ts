import type { JawNode, LayoutBox, Renderer, RendererConfig, RendererEventCallback } from '@jaw/core';
import { computeLayout } from '@jaw/layout';
import { serializeRenderPlan } from './serializer';
import { MessageBridge } from './bridge';

export type { AndroidRenderNode } from './serializer';
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
function findNodeById(tree: LayoutBox, id: string): JawNode | null {
  if (id === 'root') return tree.node;
  if (!id.startsWith('root-')) return null;
  
  const indices = id.split('-').slice(1).map(Number);
  let current: LayoutBox | undefined = tree;
  
  for (const index of indices) {
    if (!current || !current.children) return null;
    current = current.children[index];
  }
  
  return current ? current.node : null;
}

export class AndroidRenderer implements Renderer {
  readonly name = 'android';

  private bridge: MessageBridge;
  private currentTree: LayoutBox | null = null;
  private eventCallback: RendererEventCallback | null = null;
  private config: RendererConfig;
  private unsubscribe: (() => void) | null = null;

  constructor(config: RendererConfig = {}) {
    this.config = config;
    this.bridge = new MessageBridge();
  }

  /**
   * Mount a layout tree and send it to the Native host.
   */
  mount(tree: LayoutBox, container: unknown): void {
    this.currentTree = tree;
    
    // Subscribe to incoming events from the native UI
    this.unsubscribe = this.bridge.subscribe((message) => {
      if (message.type === 'EVENT' && this.eventCallback && this.currentTree && message.payload.target) {
        const targetNode = findNodeById(this.currentTree, message.payload.target);
        if (targetNode) {
          this.eventCallback(
            message.payload.type,
            targetNode,
            message.payload.nativeEvent
          );
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
  update(oldTree: LayoutBox, newTree: LayoutBox): void {
    this.currentTree = newTree;
    this.sendRenderPlan(newTree);
  }

  /**
   * Unmount and clean up.
   */
  unmount(): void {
    this.currentTree = null;
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  }

  /**
   * Register event callback for renderer-to-runtime communication.
   */
  onEvent(callback: RendererEventCallback): void {
    this.eventCallback = callback;
  }

  private sendRenderPlan(tree: LayoutBox) {
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
export function render(
  rootNode: JawNode,
  width: number,
  height: number,
): (newNode: JawNode) => void {
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

  return (newNode: JawNode) => {
    currentRootNode = newNode;
    doRender();
  };
}
