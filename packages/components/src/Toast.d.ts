import type { JawNode } from '@jaw/core';
export interface ToastConfig {
    id: string;
    message: string;
    type?: 'success' | 'error' | 'info';
    duration?: number;
}
/**
 * Imperative API to spawn a Toast from anywhere in the app.
 * Relies on the O(1) Signal reactivity engine.
 */
export declare function toast(message: string, type?: 'success' | 'error' | 'info', duration?: number): void;
/**
 * The global Toast overlay provider.
 * Should be mounted at the very top of your application tree.
 */
export declare function ToastProvider(): JawNode;
//# sourceMappingURL=Toast.d.ts.map