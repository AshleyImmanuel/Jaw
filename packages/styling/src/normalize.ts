/**
 * @jaw/styling - Normalize
 *
 * Expands shorthand style properties into their long-form equivalents.
 * For example, margin: 10 becomes { marginTop: 10, marginRight: 10, ... }
 */

import type { JawStyle, ResolvedEdges, SpacingEdges } from '@jaw/core';

/**
 * Resolve a spacing value (margin or padding) into four edges.
 *
 * Accepts:
 * - A number: applies to all four sides
 * - A SpacingEdges object: { top, right, bottom, left }
 * - undefined: all zeros
 */
export function resolveEdges(
  value: number | SpacingEdges | undefined,
  topOverride?: number,
  rightOverride?: number,
  bottomOverride?: number,
  leftOverride?: number,
): ResolvedEdges {
  let top = 0;
  let right = 0;
  let bottom = 0;
  let left = 0;

  if (typeof value === 'number') {
    top = right = bottom = left = value;
  } else if (typeof value === 'object' && value !== null) {
    top = value.top ?? 0;
    right = value.right ?? 0;
    bottom = value.bottom ?? 0;
    left = value.left ?? 0;
  }

  // Individual overrides take priority
  if (topOverride !== undefined) top = topOverride;
  if (rightOverride !== undefined) right = rightOverride;
  if (bottomOverride !== undefined) bottom = bottomOverride;
  if (leftOverride !== undefined) left = leftOverride;

  return { top, right, bottom, left };
}

/**
 * Resolve border widths into four edges.
 */
export function resolveBorderEdges(style: JawStyle): ResolvedEdges {
  const base = style.borderWidth ?? 0;
  return {
    top: style.borderTopWidth ?? base,
    right: style.borderRightWidth ?? base,
    bottom: style.borderBottomWidth ?? base,
    left: style.borderLeftWidth ?? base,
  };
}

/**
 * Normalize a JawStyle by expanding all shorthands.
 *
 * This is called by the layout engine before computing layout,
 * so the layout engine only deals with fully resolved values.
 */
export function normalizeStyle(style: JawStyle): JawStyle {
  const result = { ...style };

  // Expand margin shorthand
  if (result.margin !== undefined || result.marginTop !== undefined ||
      result.marginRight !== undefined || result.marginBottom !== undefined ||
      result.marginLeft !== undefined) {
    const edges = resolveEdges(
      result.margin as number | SpacingEdges | undefined,
      result.marginTop,
      result.marginRight,
      result.marginBottom,
      result.marginLeft,
    );
    result.marginTop = edges.top;
    result.marginRight = edges.right;
    result.marginBottom = edges.bottom;
    result.marginLeft = edges.left;
    delete result.margin;
  }

  // Expand padding shorthand
  if (result.padding !== undefined || result.paddingTop !== undefined ||
      result.paddingRight !== undefined || result.paddingBottom !== undefined ||
      result.paddingLeft !== undefined) {
    const edges = resolveEdges(
      result.padding as number | SpacingEdges | undefined,
      result.paddingTop,
      result.paddingRight,
      result.paddingBottom,
      result.paddingLeft,
    );
    result.paddingTop = edges.top;
    result.paddingRight = edges.right;
    result.paddingBottom = edges.bottom;
    result.paddingLeft = edges.left;
    delete result.padding;
  }

  return result;
}
