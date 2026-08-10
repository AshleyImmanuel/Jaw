/**
 * @jaw/runtime - Event Dispatch
 *
 * Dispatches Jaw events through the component tree.
 * Events bubble up from target to root, invoking handlers along the way.
 */
import type { JawNode, JawEventType } from '@jaw/core';
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
export declare function dispatchEvent(eventType: JawEventType, targetNode: JawNode, nativeEvent?: unknown): void;
/**
 * Dispatch an event with bubbling through a node path.
 *
 * @param eventType - The Jaw event type
 * @param nodePath - Array of nodes from target to root
 * @param nativeEvent - The platform-native event (if any)
 */
export declare function dispatchEventWithBubbling(eventType: JawEventType, nodePath: JawNode[], nativeEvent?: unknown): void;
//# sourceMappingURL=events.d.ts.map