/**
 * @jaw/components - Scroll
 *
 * Scrollable container component.
 * Wraps children in a scrollable area with configurable scroll direction.
 */

import type { JawNode, JawProps, JawStyle } from '@jaw/core';
import { createNode } from '@jaw/core';

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
export function Scroll(props: ScrollProps): JawNode {
  const {
    children = [],
    scrollDirection = 'vertical',
    style,
    ...restProps
  } = props;
  const normalizedChildren = Array.isArray(children) ? children as JawNode[] : [];

  // Apply overflow based on scroll direction
  const scrollStyle: JawStyle = {
    ...style,
    overflow: scrollDirection === 'both' ? 'scroll' : undefined,
    overflowX: scrollDirection === 'horizontal' || scrollDirection === 'both' ? 'scroll' : 'hidden',
    overflowY: scrollDirection === 'vertical' || scrollDirection === 'both' ? 'scroll' : 'hidden',
  };

  return createNode(
    'Scroll',
    { ...restProps, style: scrollStyle, scrollDirection },
    normalizedChildren,
    props.key,
  );
}
