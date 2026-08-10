/**
 * @jaw/layout - Box Model
 *
 * Resolves margin, padding, and border for layout computation.
 * Converts JawStyle spacing values into ResolvedEdges.
 */

import type { JawStyle, ResolvedEdges } from '@jaw/core';
import { resolveEdges, resolveBorderEdges } from '@jaw/styling';

/**
 * Resolve all spacing edges (margin, padding, border) from a style.
 */
export interface ResolvedBoxModel {
  margin: ResolvedEdges;
  padding: ResolvedEdges;
  border: ResolvedEdges;
}

/**
 * Extract and resolve the box model from a JawStyle.
 */
export function resolveBoxModel(style: JawStyle): ResolvedBoxModel {
  return {
    margin: resolveEdges(
      style.margin as number | undefined,
      style.marginTop as number | undefined,
      style.marginRight as number | undefined,
      style.marginBottom as number | undefined,
      style.marginLeft as number | undefined,
    ),
    padding: resolveEdges(
      style.padding as number | undefined,
      style.paddingTop as number | undefined,
      style.paddingRight as number | undefined,
      style.paddingBottom as number | undefined,
      style.paddingLeft as number | undefined,
    ),
    border: resolveBorderEdges(style),
  };
}

/**
 * Compute the total horizontal space consumed by the box model
 * (margin + border + padding on left and right).
 */
export function horizontalBoxSpace(model: ResolvedBoxModel): number {
  return (
    model.margin.left + model.margin.right +
    model.border.left + model.border.right +
    model.padding.left + model.padding.right
  );
}

/**
 * Compute the total vertical space consumed by the box model
 * (margin + border + padding on top and bottom).
 */
export function verticalBoxSpace(model: ResolvedBoxModel): number {
  return (
    model.margin.top + model.margin.bottom +
    model.border.top + model.border.bottom +
    model.padding.top + model.padding.bottom
  );
}
