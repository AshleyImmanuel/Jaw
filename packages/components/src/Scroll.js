/**
 * @jaw/components - Scroll
 *
 * Scrollable container component.
 * Wraps children in a scrollable area with configurable scroll direction.
 */
import { createNode } from '@jaw/core';
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
export function Scroll(props) {
    const { children = [], scrollDirection = 'vertical', style, ...restProps } = props;
    const normalizedChildren = Array.isArray(children) ? children : [];
    // Determine flex direction based on scroll direction if not explicitly set
    let defaultFlexDirection = 'column';
    if (scrollDirection === 'horizontal') {
        defaultFlexDirection = 'row';
    }
    // Apply overflow based on scroll direction
    const scrollStyle = {
        flexDirection: defaultFlexDirection,
        ...style,
        overflow: scrollDirection === 'both' ? 'scroll' : undefined,
        overflowX: scrollDirection === 'horizontal' || scrollDirection === 'both' ? 'scroll' : 'hidden',
        overflowY: scrollDirection === 'vertical' || scrollDirection === 'both' ? 'scroll' : 'hidden',
    };
    return createNode('Scroll', { ...restProps, style: scrollStyle, scrollDirection }, normalizedChildren, props.key);
}
//# sourceMappingURL=Scroll.js.map