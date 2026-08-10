/**
 * MessageBridge handles communication between the Jaw TypeScript runtime
 * and the Native Android host environment (Java/Kotlin).
 */
export class MessageBridge {
    listeners = new Set();
    constructor() {
        // Expose a global receiver function for the Android host to call
        globalThis.__JAW_RECEIVE_FROM_NATIVE__ = (messageString) => {
            try {
                const message = JSON.parse(messageString);
                this.notifyListeners(message);
            }
            catch (e) {
                console.error('[Jaw Android Bridge] Failed to parse message from native:', e);
            }
        };
    }
    /**
     * Sends a message to the native Android host.
     */
    send(message) {
        const bridge = globalThis.__JAW_ANDROID_BRIDGE__;
        if (bridge) {
            bridge.postMessage(JSON.stringify(message));
        }
        else {
            console.warn('[Jaw Android Bridge] Native bridge not found. Message dropped:', message);
        }
    }
    subscribe(listener) {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }
    notifyListeners(message) {
        for (const listener of this.listeners) {
            listener(message);
        }
    }
}
//# sourceMappingURL=bridge.js.map