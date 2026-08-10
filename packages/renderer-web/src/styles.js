/**
 * @jaw/renderer-web - Styles
 *
 * Converts JawStyle + LayoutBox geometry into CSS inline styles.
 * Numbers are converted to pixels, strings pass through.
 */
/** CSS properties that should NOT have 'px' appended */
const UNITLESS_PROPERTIES = new Set([
    'opacity', 'flex', 'flexGrow', 'flexShrink', 'fontWeight',
    'lineHeight', 'zIndex', 'order',
]);
/** Map JawStyle property names to CSS property names */
const CSS_PROPERTY_MAP = {
    backgroundColor: 'background-color',
    fontSize: 'font-size',
    fontWeight: 'font-weight',
    fontFamily: 'font-family',
    lineHeight: 'line-height',
    letterSpacing: 'letter-spacing',
    textAlign: 'text-align',
    textDecoration: 'text-decoration',
    textTransform: 'text-transform',
    borderWidth: 'border-width',
    borderColor: 'border-color',
    borderStyle: 'border-style',
    borderRadius: 'border-radius',
    borderTopWidth: 'border-top-width',
    borderRightWidth: 'border-right-width',
    borderBottomWidth: 'border-bottom-width',
    borderLeftWidth: 'border-left-width',
    borderTopLeftRadius: 'border-top-left-radius',
    borderTopRightRadius: 'border-top-right-radius',
    borderBottomLeftRadius: 'border-bottom-left-radius',
    borderBottomRightRadius: 'border-bottom-right-radius',
    backgroundImage: 'background-image',
    backgroundSize: 'background-size',
    backgroundPosition: 'background-position',
    boxShadow: 'box-shadow',
    overflowX: 'overflow-x',
    overflowY: 'overflow-y',
    userSelect: 'user-select',
    flexDirection: 'flex-direction',
    alignItems: 'align-items',
    alignSelf: 'align-self',
    justifyContent: 'justify-content',
    flexBasis: 'flex-basis',
    marginTop: 'margin-top',
    marginRight: 'margin-right',
    marginBottom: 'margin-bottom',
    marginLeft: 'margin-left',
    paddingTop: 'padding-top',
    paddingRight: 'padding-right',
    paddingBottom: 'padding-bottom',
    paddingLeft: 'padding-left',
    minWidth: 'min-width',
    maxWidth: 'max-width',
    minHeight: 'min-height',
    maxHeight: 'max-height',
};
/** Properties to skip when generating CSS (handled separately) */
const SKIP_PROPERTIES = new Set([
    'flexDirection', 'alignItems', 'justifyContent', 'gap',
    'flex', 'flexGrow', 'flexShrink', 'flexBasis', 'alignSelf',
    'margin', 'padding',
    'width', 'height', 'minWidth', 'maxWidth', 'minHeight', 'maxHeight',
    'position', 'top', 'right', 'bottom', 'left',
]);
/**
 * Convert a JawStyle value to a CSS value string.
 */
function toCSSValue(prop, value) {
    if (typeof value === 'number') {
        if (UNITLESS_PROPERTIES.has(prop)) {
            return String(value);
        }
        return `${value}px`;
    }
    return String(value);
}
/**
 * Generate CSS style string from a LayoutBox.
 *
 * Combines the node's JawStyle with computed layout geometry.
 * The layout engine has already computed positions and sizes.
 */
export function layoutBoxToCSS(layoutBox) {
    const style = layoutBox.node.props.style ?? {};
    const parts = [];
    // Layout-computed styles (from LayoutBox)
    parts.push(`display:flex`);
    parts.push(`box-sizing:border-box`);
    parts.push(`position:${style.position ?? 'relative'}`);
    parts.push(`width:${layoutBox.width}px`);
    parts.push(`height:${layoutBox.height}px`);
    // Flex direction
    if (style.flexDirection) {
        parts.push(`flex-direction:${style.flexDirection}`);
    }
    // Alignment
    if (style.alignItems) {
        const val = mapAlignValue(style.alignItems);
        parts.push(`align-items:${val}`);
    }
    if (style.justifyContent) {
        const val = mapAlignValue(style.justifyContent);
        parts.push(`justify-content:${val}`);
    }
    if (style.alignSelf) {
        const val = mapAlignValue(style.alignSelf);
        parts.push(`align-self:${val}`);
    }
    // Gap
    if (style.gap !== undefined) {
        parts.push(`gap:${style.gap}px`);
    }
    // Padding (from layout box)
    if (layoutBox.padding.top || layoutBox.padding.right ||
        layoutBox.padding.bottom || layoutBox.padding.left) {
        parts.push(`padding:${layoutBox.padding.top}px ${layoutBox.padding.right}px ${layoutBox.padding.bottom}px ${layoutBox.padding.left}px`);
    }
    // Visual styles (pass through from JawStyle)
    for (const [key, value] of Object.entries(style)) {
        if (SKIP_PROPERTIES.has(key))
            continue;
        if (value === undefined)
            continue;
        const cssKey = CSS_PROPERTY_MAP[key] ?? key;
        parts.push(`${cssKey}:${toCSSValue(key, value)}`);
    }
    return parts.join(';');
}
/**
 * Map Jaw alignment values to CSS values.
 * Jaw uses 'start'/'end', CSS uses 'flex-start'/'flex-end'.
 */
function mapAlignValue(value) {
    switch (value) {
        case 'start': return 'flex-start';
        case 'end': return 'flex-end';
        default: return value;
    }
}
//# sourceMappingURL=styles.js.map