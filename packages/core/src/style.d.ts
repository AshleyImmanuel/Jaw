/**
 * @jaw/core - Style Types
 *
 * Defines the complete JawStyle interface.
 * Supported in Beta 1: spacing, colors, typography, borders, radius,
 * background, position, overflow.
 * Unsupported in Beta 1: grid, filters, blend modes, pseudo-elements.
 */
/** Alignment values for cross-axis positioning */
export type AlignItems = 'start' | 'center' | 'end' | 'stretch';
/** Justification values for main-axis distribution */
export type JustifyContent = 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
/** Flex direction */
export type FlexDirection = 'row' | 'column';
/** Overflow behavior */
export type Overflow = 'visible' | 'hidden' | 'scroll';
/** Position type */
export type Position = 'relative' | 'absolute';
/** Text alignment */
export type TextAlign = 'left' | 'center' | 'right';
/** Font weight -- numeric or named */
export type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 'normal' | 'bold';
/** Directional spacing (margin, padding) */
export interface SpacingEdges {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
}
/** Border specification */
export interface BorderStyle {
    width?: number;
    color?: string;
    style?: 'solid' | 'dashed' | 'dotted' | 'none';
}
/**
 * The complete Jaw style interface.
 *
 * All numeric values without units are interpreted as pixels.
 * String values like '50%' are percentage-based and resolved during layout.
 */
export interface JawStyle {
    width?: number | string;
    height?: number | string;
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    flex?: number;
    flexDirection?: FlexDirection;
    flexGrow?: number;
    flexShrink?: number;
    flexBasis?: number | string;
    alignItems?: AlignItems;
    alignSelf?: AlignItems;
    justifyContent?: JustifyContent;
    gap?: number;
    margin?: number | SpacingEdges;
    marginTop?: number;
    marginRight?: number;
    marginBottom?: number;
    marginLeft?: number;
    padding?: number | SpacingEdges;
    paddingTop?: number;
    paddingRight?: number;
    paddingBottom?: number;
    paddingLeft?: number;
    position?: Position;
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
    backgroundColor?: string;
    color?: string;
    opacity?: number;
    fontSize?: number;
    fontWeight?: FontWeight;
    fontFamily?: string;
    lineHeight?: number;
    letterSpacing?: number;
    textAlign?: TextAlign;
    textDecoration?: 'none' | 'underline' | 'line-through';
    textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
    borderWidth?: number;
    borderColor?: string;
    borderStyle?: 'solid' | 'dashed' | 'dotted' | 'none';
    borderRadius?: number;
    borderTopWidth?: number;
    borderRightWidth?: number;
    borderBottomWidth?: number;
    borderLeftWidth?: number;
    borderTopLeftRadius?: number;
    borderTopRightRadius?: number;
    borderBottomLeftRadius?: number;
    borderBottomRightRadius?: number;
    backgroundImage?: string;
    backgroundSize?: 'cover' | 'contain' | string;
    backgroundPosition?: string;
    overflow?: Overflow;
    overflowX?: Overflow;
    overflowY?: Overflow;
    boxShadow?: string;
    cursor?: string;
    userSelect?: 'none' | 'auto' | 'text' | 'all';
    transition?: string;
    transform?: string;
    [property: string]: unknown;
}
/**
 * Resolved spacing edges -- after shorthand expansion.
 * Used internally by the layout engine.
 */
export interface ResolvedEdges {
    top: number;
    right: number;
    bottom: number;
    left: number;
}
//# sourceMappingURL=style.d.ts.map