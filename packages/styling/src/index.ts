/**
 * @jaw/styling
 *
 * Style resolution, normalization, merging, defaults, and validation.
 */

export { normalizeStyle, resolveEdges, resolveBorderEdges } from './normalize';
export { mergeStyles, mergeStyleList } from './merge';
export { getDefaultStyles, setDefaultStyles } from './defaults';
export { validateStyle } from './validate';
export type { ValidationResult } from './validate';
