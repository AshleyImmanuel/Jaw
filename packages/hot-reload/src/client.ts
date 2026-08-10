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
export function getHMRClientScript(wsPort: number = 3001): string {
  return `
(function() {
  var ws = new WebSocket('ws://localhost:${wsPort}');
  var reconnectTimer = null;

  ws.onopen = function() {
    console.log('[Jaw HMR] Connected');
  };

  ws.onmessage = function(event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.log('[Jaw HMR] File changed: ' + data.file);
      // For Beta 1, do a full page reload
      // Future: module-level hot replacement
      window.location.reload();
    }
  };

  ws.onclose = function() {
    console.log('[Jaw HMR] Disconnected. Reconnecting...');
    reconnectTimer = setTimeout(function() {
      window.location.reload();
    }, 2000);
  };

  ws.onerror = function() {
    // Silently ignore connection errors during development
  };
})();
`;
}
