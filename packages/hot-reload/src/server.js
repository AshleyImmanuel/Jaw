/**
 * @jaw/hot-reload - Server
 *
 * WebSocket server that watches for file changes and
 * sends update signals to connected browsers.
 */
import { WebSocketServer, WebSocket } from 'ws';
import fs from 'fs';
import path from 'path';
/**
 * Create and start an HMR WebSocket server.
 */
export function createHMRServer(options = {}) {
    const { port = 3001, watchDir = 'src' } = options;
    const wss = new WebSocketServer({ port });
    const clients = new Set();
    wss.on('connection', (ws) => {
        clients.add(ws);
        console.log('[HMR] Client connected');
        ws.on('close', () => {
            clients.delete(ws);
        });
    });
    // Watch for file changes
    const watchPath = path.resolve(process.cwd(), watchDir);
    if (fs.existsSync(watchPath)) {
        fs.watch(watchPath, { recursive: true }, (eventType, filename) => {
            if (!filename)
                return;
            if (!filename.match(/\.(ts|tsx|js|jsx|css)$/))
                return;
            console.log(`[HMR] File changed: ${filename}`);
            // Notify all connected clients
            const message = JSON.stringify({
                type: 'update',
                file: filename,
                timestamp: Date.now(),
            });
            for (const client of clients) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            }
        });
    }
    console.log(`[HMR] WebSocket server running on ws://localhost:${port}`);
    return {
        close: () => {
            wss.close();
            for (const client of clients) {
                client.close();
            }
        },
        broadcast: (message) => {
            for (const client of clients) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            }
        },
    };
}
//# sourceMappingURL=server.js.map