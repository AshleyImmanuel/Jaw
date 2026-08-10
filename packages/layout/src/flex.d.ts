/**
 * @jaw/layout - Flex Distribution
 *
 * Distributes available space among flex children.
 * Implements flex-grow proportional sizing and gap distribution.
 */
import type { JawStyle } from '@jaw/core';
export interface FlexChild {
    /** Index in the children array */
    index: number;
    /** The child's resolved style */
    style: JawStyle;
    /** Fixed size on the main axis (if specified), else undefined */
    fixedMainSize: number | undefined;
    /** Fixed size on the cross axis (if specified), else undefined */
    fixedCrossSize: number | undefined;
    /** Flex value (0 means no flex) */
    flex: number;
    /** Computed main axis size (output) */
    mainSize: number;
    /** Computed cross axis size (output) */
    crossSize: number;
}
/**
 * Distribute available space along the main axis among children.
 *
 * Algorithm:
 * 1. Sum up fixed-size children
 * 2. Subtract gaps between children
 * 3. Remaining space is distributed proportionally among flex children
 *
 * @param children - Array of flex children to size
 * @param availableMainSize - Total available space on the main axis
 * @param gap - Gap between children
 * @param isRow - Whether main axis is horizontal (row) or vertical (column)
 */
export declare function distributeFlexSpace(children: FlexChild[], availableMainSize: number, gap: number, isRow: boolean): void;
/**
 * Compute cross-axis sizes for children.
 *
 * @param children - Array of flex children
 * @param availableCrossSize - Available space on the cross axis
 * @param alignItems - How to align children on the cross axis
 * @param isRow - Whether main axis is horizontal
 */
export declare function computeCrossSizes(children: FlexChild[], availableCrossSize: number, alignItems: string, isRow: boolean): void;
/**
 * Compute positions along the main axis based on justifyContent.
 *
 * @param children - Array of children with computed mainSize
 * @param availableMainSize - Total available main axis space
 * @param gap - Gap between children
 * @param justify - Justification mode
 * @returns Array of main-axis positions for each child
 */
export declare function computeMainPositions(children: FlexChild[], availableMainSize: number, gap: number, justify: string): number[];
/**
 * Compute cross-axis positions based on alignItems.
 *
 * @param children - Array of children with computed crossSize
 * @param availableCrossSize - Total available cross axis space
 * @param alignItems - Alignment mode
 * @returns Array of cross-axis positions
 */
export declare function computeCrossPositions(children: FlexChild[], availableCrossSize: number, alignItems: string): number[];
//# sourceMappingURL=flex.d.ts.map