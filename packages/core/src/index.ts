/**
 * @jaw/core
 *
 * The core package exports all shared types and utilities used by
 * every other Jaw package. This is the foundation of the UCT
 * (Universal Component Tree) architecture.
 */

// --- Node types ---
export type {
  JawNode,
  JawTextNode,
  JawProps,
  JawComponent,
  JawElementType,
  JawNodeType,
} from './node';

export {
  isJawNode,
  isTextNode,
  createNode,
} from './node';

// --- Style types ---
export type {
  JawStyle,
  AlignItems,
  JustifyContent,
  FlexDirection,
  Overflow,
  Position,
  TextAlign,
  FontWeight,
  SpacingEdges,
  BorderStyle,
  ResolvedEdges,
} from './style';

// --- Layout types ---
export type {
  LayoutBox,
  LayoutRect,
  LayoutConstraints,
} from './layout';

// --- Event types ---
export type {
  JawEvent,
  JawEventHandler,
  JawEventType,
} from './events';

export {
  createJawEvent,
  EVENT_HANDLER_MAP,
} from './events';

// --- Renderer interface ---
export type {
  Renderer,
  RendererEventCallback,
  RendererConfig,
} from './renderer';
