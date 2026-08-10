/**
 * @jaw/renderer-web - Events
 *
 * Binds Jaw event handlers to DOM events.
 * Maps Jaw event types (onPress, etc.) to DOM events (click, etc.).
 */
import type { JawNode } from '@jaw/core';
/**
 * Bind all event handlers from a JawNode to a DOM element.
 *
 * @param element - The DOM element to attach listeners to
 * @param node - The JawNode containing handler props
 * @returns A cleanup function that removes all listeners
 */
export declare function bindEvents(element: HTMLElement, node: JawNode): () => void;
//# sourceMappingURL=events.d.ts.map