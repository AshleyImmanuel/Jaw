/**
 * @jaw/components - Spacer
 *
 * Flexible space component.
 * Takes up remaining space in a flex container, or a fixed size.
 */

import type { JawNode, JawProps, JawStyle } from '@jaw/core';
import { createNode } from '@jaw/core';

export interface SpacerProps extends JawProps {
  /** Fixed size in pixels. If omitted, spacer uses flex: 1. */
  size?: number;
  style?: JawStyle;
}

/**
 * Spacer -- fills available space or a fixed amount.
 *
 * Usage:
 *   <Row>
 *     <Text>Left</Text>
 *     <Spacer />           // Pushes Right to the end
 *     <Text>Right</Text>
 *   </Row>
 *
 *   <Column>
 *     <Text>Top</Text>
 *     <Spacer size={20} /> // Fixed 20px gap
 *     <Text>Bottom</Text>
 *   </Column>
 */
export function Spacer(props: SpacerProps): JawNode {
  const { size, style, ...restProps } = props;

  const spacerStyle: JawStyle = size !== undefined
    ? { width: size, height: size, ...style }
    : { flex: 1, ...style };

  return createNode(
    'Spacer',
    { ...restProps, style: spacerStyle },
    [], // Spacer is a leaf node
    props.key,
  );
}
