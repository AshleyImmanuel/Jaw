/**
 * @jaw/components - Column
 *
 * Vertical layout container.
 * Children are laid out top-to-bottom along the main axis.
 * Equivalent to Box with flexDirection: 'column'.
 */

import type { JawNode, JawProps, JawStyle } from '@jaw/core';
import { createNode } from '@jaw/core';

export interface ColumnProps extends JawProps {
  style?: JawStyle;
  children?: ReadonlyArray<JawNode>;
}

/**
 * Column -- vertical flex container.
 *
 * Usage:
 *   <Column style={{ gap: 12 }}>
 *     <Text>Top</Text>
 *     <Text>Bottom</Text>
 *   </Column>
 */
export function Column(props: ColumnProps): JawNode {
  const { children = [], style, ...restProps } = props;
  const normalizedChildren = Array.isArray(children) ? children as JawNode[] : [];

  const mergedStyle: JawStyle = {
    flexDirection: 'column',
    ...style,
  };

  return createNode(
    'Column',
    { ...restProps, style: mergedStyle },
    normalizedChildren,
    props.key,
  );
}
