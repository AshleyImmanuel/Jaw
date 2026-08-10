/**
 * @jaw/runtime - Event Dispatch
 *
 * Dispatches Jaw events through the component tree.
 * Events bubble up from target to root, invoking handlers along the way.
 */
import { createJawEvent, EVENT_HANDLER_MAP } from '@jaw/core';
/**
 * Dispatch an event to a target node.
 *
 * Looks up the appropriate handler prop on the node and invokes it.
 * If the event has bubbling enabled, walks up the tree.
 *
 * @param eventType - The Jaw event type
 * @param targetNode - The node that received the event
 * @param nativeEvent - The platform-native event (if any)
 */
export function dispatchEvent(eventType, targetNode, nativeEvent) {
    const handlerName = EVENT_HANDLER_MAP[eventType];
    if (!handlerName) {
        console.warn(`[Jaw] Unknown event type: "${eventType}"`);
        return;
    }
    const handler = targetNode.props[handlerName];
    if (typeof handler === 'function') {
        const event = createJawEvent(eventType, null, nativeEvent);
        try {
            handler(event);
        }
        catch (err) {
            console.error(`[Jaw] Error in ${handlerName} handler:`, err);
        }
    }
}
/**
 * Dispatch an event with bubbling through a node path.
 *
 * @param eventType - The Jaw event type
 * @param nodePath - Array of nodes from target to root
 * @param nativeEvent - The platform-native event (if any)
 */
export function dispatchEventWithBubbling(eventType, nodePath, nativeEvent) {
    const handlerName = EVENT_HANDLER_MAP[eventType];
    if (!handlerName)
        return;
    const event = createJawEvent(eventType, null, nativeEvent);
    // Walk from target (first) to root (last)
    for (const node of nodePath) {
        if (event.consumed)
            break;
        const handler = node.props[handlerName];
        if (typeof handler === 'function') {
            try {
                handler(event);
            }
            catch (err) {
                console.error(`[Jaw] Error in ${handlerName} handler:`, err);
            }
        }
    }
}
//# sourceMappingURL=events.js.map