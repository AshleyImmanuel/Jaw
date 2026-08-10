/**
 * @jaw/hot-reload - Server
 *
 * WebSocket server that watches for file changes and
 * sends update signals to connected browsers.
 */
export interface HMRServerOptions {
    port?: number;
    watchDir?: string;
}
/**
 * Create and start an HMR WebSocket server.
 */
export declare function createHMRServer(options?: HMRServerOptions): {
    close: () => void;
    broadcast: (message: string) => void;
};
//# sourceMappingURL=server.d.ts.map