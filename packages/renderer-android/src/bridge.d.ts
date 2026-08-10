import type { AndroidRenderNode } from './serializer';
import type { JawEvent } from '@jaw/core';
declare global {
    var __JAW_ANDROID_BRIDGE__: {
        postMessage: (message: string) => void;
    } | undefined;
}
export type NativeMessage = {
    type: 'RENDER';
    payload: AndroidRenderNode;
} | {
    type: 'MEASURE_TEXT';
    payload: {
        content: string;
        fontSize: number;
        id: string;
    };
};
export type FromNativeMessage = {
    type: 'EVENT';
    payload: JawEvent;
} | {
    type: 'MEASURE_RESULT';
    payload: {
        id: string;
        width: number;
        height: number;
    };
};
type MessageListener = (message: FromNativeMessage) => void;
/**
 * MessageBridge handles communication between the Jaw TypeScript runtime
 * and the Native Android host environment (Java/Kotlin).
 */
export declare class MessageBridge {
    private listeners;
    constructor();
    /**
     * Sends a message to the native Android host.
     */
    send(message: NativeMessage): void;
    subscribe(listener: MessageListener): () => void;
    private notifyListeners;
}
export {};
//# sourceMappingURL=bridge.d.ts.map