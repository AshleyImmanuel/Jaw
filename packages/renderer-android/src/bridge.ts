import type { AndroidRenderNode } from './serializer';
import type { JawEvent } from '@jaw/core';

declare global {
  var __JAW_ANDROID_BRIDGE__: {
    postMessage: (message: string) => void;
  } | undefined;
}

export type NativeMessage = 
  | { type: 'RENDER'; payload: AndroidRenderNode }
  | { type: 'MEASURE_TEXT'; payload: { content: string, fontSize: number, id: string } };

export type FromNativeMessage =
  | { type: 'EVENT'; payload: JawEvent }
  | { type: 'MEASURE_RESULT'; payload: { id: string, width: number, height: number } };

type MessageListener = (message: FromNativeMessage) => void;

/**
 * MessageBridge handles communication between the Jaw TypeScript runtime
 * and the Native Android host environment (Java/Kotlin).
 */
export class MessageBridge {
  private listeners: Set<MessageListener> = new Set();

  constructor() {
    // Expose a global receiver function for the Android host to call
    (globalThis as any).__JAW_RECEIVE_FROM_NATIVE__ = (messageString: string) => {
      try {
        const message: FromNativeMessage = JSON.parse(messageString);
        this.notifyListeners(message);
      } catch (e) {
        console.error('[Jaw Android Bridge] Failed to parse message from native:', e);
      }
    };
  }

  /**
   * Sends a message to the native Android host.
   */
  public send(message: NativeMessage): void {
    const bridge = globalThis.__JAW_ANDROID_BRIDGE__;
    if (bridge) {
      bridge.postMessage(JSON.stringify(message));
    } else {
      console.warn('[Jaw Android Bridge] Native bridge not found. Message dropped:', message);
    }
  }

  public subscribe(listener: MessageListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(message: FromNativeMessage): void {
    for (const listener of this.listeners) {
      listener(message);
    }
  }
}
