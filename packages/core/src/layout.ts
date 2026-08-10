/**
 * @jaw/core - Layout Types
 *
 * Defines the output of the layout engine.
 * The layout engine takes a JawNode tree and produces a LayoutBox tree
 * where every node has computed position and size.
 */

import type { JawNode } from './node';
import type { ResolvedEdges } from './style';

/**
 * A rectangle with position and dimensions.
 * Used for onLayout callbacks and hit testing.
 */
export interface LayoutRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * A laid-out node in the render tree.
 *
 * Produced by the layout engine, consumed by renderers.
 * Each LayoutBox maps 1:1 to a JawNode and carries computed geometry.
 */
export interface LayoutBox {
  /** The original JawNode this layout was computed for */
  readonly node: JawNode;

  /** Position relative to the parent's content box */
  x: number;
  y: number;

  /** Computed content dimensions (excluding padding/border/margin) */
  width: number;
  height: number;

  /** Resolved spacing */
  margin: ResolvedEdges;
  padding: ResolvedEdges;
  border: ResolvedEdges;

  /** Child layout boxes, in order */
  children: LayoutBox[];
}

/**
 * Input constraints passed down from parent to child during layout.
 * Tells a child how much space is available.
 */
export interface LayoutConstraints {
  /** Available width from the parent's content area */
  availableWidth: number;

  /** Available height from the parent's content area */
  availableHeight: number;

  /** Whether width is determined (fixed) or flexible */
  widthMode: 'exact' | 'atMost' | 'unconstrained';

  /** Whether height is determined (fixed) or flexible */
  heightMode: 'exact' | 'atMost' | 'unconstrained';
}

/**
 * Context provided to a MeasureFunction to compute intrinsic size.
 */
export interface TextMeasureContext {
  content: string;
  fontSize?: number | string;
  fontWeight?: string | number;
  fontFamily?: string;
  lineHeight?: number | string;
  letterSpacing?: number;
  availableWidth: number;
}

/**
 * A function that computes the intrinsic width and height of a node.
 * For example, measuring text given font styles and available width.
 */
export type MeasureFunction = (ctx: TextMeasureContext) => { width: number; height: number };

