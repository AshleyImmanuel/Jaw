/**
 * @jaw/styling - Defaults
 *
 * Default styles for each built-in component type.
 * These are applied as the base layer before user styles.
 */

import type { JawStyle } from '@jaw/core';

/** Default styles per component type */
const componentDefaults: Record<string, JawStyle> = {
  Box: {
    flexDirection: 'column',
    position: 'relative',
  },
  Row: {
    flexDirection: 'row',
    position: 'relative',
  },
  Column: {
    flexDirection: 'column',
    position: 'relative',
  },
  Text: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 'normal',
  },
  Button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    position: 'relative',
    userSelect: 'none',
  },
  Image: {
    position: 'relative',
  },
  Spacer: {
    // Spacer handles its own defaults in the component
  },
  Scroll: {
    flexDirection: 'column',
    position: 'relative',
    overflow: 'scroll',
  },
};

/**
 * Get the default styles for a component type.
 *
 * @param type - The component type name
 * @returns Default style object (empty if type has no defaults)
 */
export function getDefaultStyles(type: string): JawStyle {
  return componentDefaults[type] ?? {};
}

/**
 * Register custom default styles for a component type.
 * Can be used to override built-in defaults or add defaults for custom components.
 *
 * @param type - The component type name
 * @param styles - Default styles to set
 */
export function setDefaultStyles(type: string, styles: JawStyle): void {
  componentDefaults[type] = { ...styles };
}
