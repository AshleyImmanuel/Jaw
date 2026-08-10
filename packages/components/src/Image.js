/**
 * @jaw/components - Image
 *
 * Image display component.
 * Renders an image from a source URL.
 * This is a leaf node -- no child components.
 */
import { createNode } from '@jaw/core';
/**
 * Image -- displays an image.
 *
 * Usage:
 *   <Image src="/logo.png" alt="Logo" style={{ width: 200, height: 100 }} />
 */
export function Image(props) {
    const { src, alt = '', ...restProps } = props;
    return createNode('Image', { ...restProps, src, alt }, [], // Image is a leaf node
    props.key);
}
//# sourceMappingURL=Image.js.map