/**
 * @jaw/components - Image
 *
 * Image display component.
 * Renders an image from a source URL.
 * This is a leaf node -- no child components.
 */
import type { JawNode, JawProps, JawStyle } from '@jaw/core';
export interface ImageProps extends JawProps {
    /** Image source URL */
    src: string;
    /** Alt text for accessibility */
    alt?: string;
    style?: JawStyle;
}
/**
 * Image -- displays an image.
 *
 * Usage:
 *   <Image src="/logo.png" alt="Logo" style={{ width: 200, height: 100 }} />
 */
export declare function Image(props: ImageProps): JawNode;
//# sourceMappingURL=Image.d.ts.map