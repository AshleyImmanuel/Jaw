/**
 * @jaw/styling - Validate
 *
 * Validates style values and flags unsupported properties.
 * Unsupported in Beta 1: grid, filters, blend modes, pseudo-elements.
 */
/** Properties not supported in Beta 1 */
const UNSUPPORTED_PROPERTIES = new Set([
    'display', // Always flex in Jaw
    'grid',
    'gridTemplate',
    'gridTemplateColumns',
    'gridTemplateRows',
    'gridColumn',
    'gridRow',
    'gridArea',
    'gridGap',
    'filter',
    'backdropFilter',
    'mixBlendMode',
    'backgroundBlendMode',
    'content', // Pseudo-elements
    '::before',
    '::after',
    ':hover', // Pseudo-classes handled differently
    ':focus',
    ':active',
    'animation',
    'animationName',
    'animationDuration',
    'keyframes',
]);
/**
 * Validate a JawStyle object.
 *
 * Returns warnings for unsupported properties and errors for
 * invalid values.
 *
 * @param style - The style object to validate
 * @returns Validation result with warnings and errors
 */
export function validateStyle(style) {
    const warnings = [];
    const errors = [];
    for (const [key, value] of Object.entries(style)) {
        // Check for unsupported properties
        if (UNSUPPORTED_PROPERTIES.has(key)) {
            warnings.push(`Property "${key}" is not supported in Jaw Beta 1 and will be ignored.`);
            continue;
        }
        // Validate specific property values
        if (value === undefined)
            continue;
        switch (key) {
            case 'flex':
            case 'flexGrow':
            case 'flexShrink':
                if (typeof value !== 'number' || value < 0) {
                    errors.push(`"${key}" must be a non-negative number, got: ${value}`);
                }
                break;
            case 'opacity':
                if (typeof value !== 'number' || value < 0 || value > 1) {
                    errors.push(`"opacity" must be between 0 and 1, got: ${value}`);
                }
                break;
            case 'fontSize':
            case 'lineHeight':
            case 'letterSpacing':
            case 'gap':
                if (typeof value !== 'number' || value < 0) {
                    errors.push(`"${key}" must be a non-negative number, got: ${value}`);
                }
                break;
            case 'flexDirection':
                if (value !== 'row' && value !== 'column') {
                    errors.push(`"flexDirection" must be "row" or "column", got: ${value}`);
                }
                break;
            case 'overflow':
            case 'overflowX':
            case 'overflowY':
                if (!['visible', 'hidden', 'scroll'].includes(value)) {
                    errors.push(`"${key}" must be "visible", "hidden", or "scroll", got: ${value}`);
                }
                break;
            case 'position':
                if (value !== 'relative' && value !== 'absolute') {
                    errors.push(`"position" must be "relative" or "absolute", got: ${value}`);
                }
                break;
        }
    }
    return {
        valid: errors.length === 0,
        warnings,
        errors,
    };
}
//# sourceMappingURL=validate.js.map