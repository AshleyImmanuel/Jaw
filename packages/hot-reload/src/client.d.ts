/**
 * @jaw/hot-reload - Client
 *
 * Browser-side HMR client. Injected during development.
 * Connects to the HMR server and triggers page reloads
 * when source files change.
 */
/**
 * Generate the HMR client script to inject into the browser.
 *
 * @param wsPort - The WebSocket server port
 * @returns JavaScript source code for the HMR client
 */
export declare function getHMRClientScript(wsPort?: number): string;
//# sourceMappingURL=client.d.ts.map