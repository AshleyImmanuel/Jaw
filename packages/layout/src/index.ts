/**
 * @jaw/layout
 *
 * The Jaw layout engine. Computes positions and sizes for the
 * Universal Component Tree using a flexbox-inspired algorithm.
 */

export { computeLayout } from './engine';
export { resolveBoxModel, horizontalBoxSpace, verticalBoxSpace } from './box-model';
export { clampWidth, clampHeight, resolveDimension } from './constraints';
export {
  distributeFlexSpace,
  computeCrossSizes,
  computeMainPositions,
  computeCrossPositions,
} from './flex';
export type { FlexChild } from './flex';
