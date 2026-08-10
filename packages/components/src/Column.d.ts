/**
 * @jaw/components - Column
 *
 * Vertical layout container.
 * Children are laid out top-to-bottom along the main axis.
 * Equivalent to Box with flexDirection: 'column'.
 */
import type { JawNode, JawProps, JawStyle } from '@jaw/core';
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
export declare function Column(props: ColumnProps): JawNode;
//# sourceMappingURL=Column.d.ts.map