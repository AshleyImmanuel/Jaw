/**
 * @jaw/renderer-web - Events
 *
 * Binds Jaw event handlers to DOM events.
 * Maps Jaw event types (onPress, etc.) to DOM events (click, etc.).
 */

import type { JawNode, JawEventType } from '@jaw/core';
import { createJawEvent } from '@jaw/core';

/** Map Jaw handler prop names to DOM event names */
const JAW_TO_DOM_EVENT: Record<string, string> = {
  onPress: 'click',
  onLongPress: 'contextmenu',
  onPressIn: 'mousedown',
  onPressOut: 'mouseup',
  onFocus: 'focus',
  onBlur: 'blur',
  onScroll: 'scroll',
};

/** Map Jaw handler prop names to JawEventType */
const JAW_PROP_TO_EVENT_TYPE: Record<string, JawEventType> = {
  onPress: 'press',
  onLongPress: 'longPress',
  onPressIn: 'pressIn',
  onPressOut: 'pressOut',
  onFocus: 'focus',
  onBlur: 'blur',
  onScroll: 'scroll',
};

/**
 * Bind all event handlers from a JawNode to a DOM element.
 *
 * @param element - The DOM element to attach listeners to
 * @param node - The JawNode containing handler props
 * @returns A cleanup function that removes all listeners
 */
export function bindEvents(
  element: HTMLElement,
  node: JawNode,
): () => void {
  const cleanups: Array<() => void> = [];

  for (const [propName, domEventName] of Object.entries(JAW_TO_DOM_EVENT)) {
    const handler = node.props[propName];
    if (typeof handler === 'function') {
      const eventType = JAW_PROP_TO_EVENT_TYPE[propName];

      const listener = (nativeEvent: Event) => {
        const jawEvent = createJawEvent(eventType, null, nativeEvent);
        (handler as Function)(jawEvent);
      };

      element.addEventListener(domEventName, listener);
      cleanups.push(() => element.removeEventListener(domEventName, listener));
    }
  }

  return () => {
    for (const cleanup of cleanups) {
      cleanup();
    }
  };
}
