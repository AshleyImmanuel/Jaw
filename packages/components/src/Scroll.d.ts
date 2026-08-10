/**
 * @jaw/components - Scroll
 *
 * Scrollable container component.
 * Wraps children in a scrollable area with configurable scroll direction.
 */
import type { JawNode, JawProps, JawStyle } from '@jaw/core';
export interface ScrollProps extends JawProps {
    /** Scroll direction: vertical, horizontal, or both */
    scrollDirection?: 'vertical' | 'horizontal' | 'both';
    style?: JawStyle;
    children?: ReadonlyArray<JawNode>;
}
/**
 * Scroll -- scrollable container.
 *
 * Usage:
 *   <Scroll style={{ height: 300 }}>
 *     <Text>Lots of content...</Text>
 *     <Text>More content...</Text>
 *   </Scroll>
 *
 *   <Scroll scrollDirection="horizontal" style={{ width: 400 }}>
 *     <Row>
 *       <Box style={{ width: 200 }} />
 *       <Box style={{ width: 200 }} />
 *       <Box style={{ width: 200 }} />
 *     </Row>
 *   </Scroll>
 */
export declare function Scroll(props: ScrollProps): JawNode;
//# sourceMappingURL=Scroll.d.ts.map