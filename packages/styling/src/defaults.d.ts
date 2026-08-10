/**
 * @jaw/styling - Defaults
 *
 * Default styles for each built-in component type.
 * These are applied as the base layer before user styles.
 */
import type { JawStyle } from '@jaw/core';
/**
 * Get the default styles for a component type.
 *
 * @param type - The component type name
 * @returns Default style object (empty if type has no defaults)
 */
export declare function getDefaultStyles(type: string): JawStyle;
/**
 * Register custom default styles for a component type.
 * Can be used to override built-in defaults or add defaults for custom components.
 *
 * @param type - The component type name
 * @param styles - Default styles to set
 */
export declare function setDefaultStyles(type: string, styles: JawStyle): void;
//# sourceMappingURL=defaults.d.ts.map