/**
 * @jaw/core
 *
 * The core package exports all shared types and utilities used by
 * every other Jaw package. This is the foundation of the UCT
 * (Universal Component Tree) architecture.
 */
export type { JawNode, JawTextNode, JawProps, JawComponent, JawElementType, JawNodeType, } from './node';
export { isJawNode, isTextNode, createNode, } from './node';
export type { JawStyle, AlignItems, JustifyContent, FlexDirection, Overflow, Position, TextAlign, FontWeight, SpacingEdges, BorderStyle, ResolvedEdges, } from './style';
export type { LayoutBox, LayoutRect, LayoutConstraints, TextMeasureContext, MeasureFunction, } from './layout';
export type { JawEvent, JawEventHandler, JawEventType, } from './events';
export { createJawEvent, EVENT_HANDLER_MAP, } from './events';
export type { Renderer, RendererEventCallback, RendererConfig, } from './renderer';
//# sourceMappingURL=index.d.ts.map