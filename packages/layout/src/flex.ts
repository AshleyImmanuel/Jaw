/**
 * @jaw/layout - Flex Distribution
 *
 * Distributes available space among flex children.
 * Implements flex-grow proportional sizing and gap distribution.
 */

import type { JawStyle } from '@jaw/core';
import { clampWidth, clampHeight } from './constraints';

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
export function distributeFlexSpace(
  children: FlexChild[],
  availableMainSize: number,
  gap: number,
  isRow: boolean,
): void {
  if (children.length === 0) return;

  // Calculate total gap space
  const totalGap = gap * (children.length - 1);

  // Calculate space used by fixed-size children
  let fixedSpace = 0;
  let totalFlex = 0;

  for (const child of children) {
    if (child.fixedMainSize !== undefined) {
      fixedSpace += child.fixedMainSize;
    } else if (child.flex > 0) {
      totalFlex += child.flex;
    } else {
      // No fixed size and no flex -- use 0 (will be sized by content)
      child.mainSize = 0;
    }
  }

  // Remaining space for flex children
  const remainingSpace = Math.max(0, availableMainSize - fixedSpace - totalGap);

  // Distribute to each child
  for (const child of children) {
    if (child.fixedMainSize !== undefined) {
      child.mainSize = child.fixedMainSize;
    } else if (child.flex > 0 && totalFlex > 0) {
      child.mainSize = (child.flex / totalFlex) * remainingSpace;
    }

    // Apply min/max constraints
    if (isRow) {
      child.mainSize = clampWidth(child.mainSize, child.style);
    } else {
      child.mainSize = clampHeight(child.mainSize, child.style);
    }
  }
}

/**
 * Compute cross-axis sizes for children.
 *
 * @param children - Array of flex children
 * @param availableCrossSize - Available space on the cross axis
 * @param alignItems - How to align children on the cross axis
 * @param isRow - Whether main axis is horizontal
 */
export function computeCrossSizes(
  children: FlexChild[],
  availableCrossSize: number,
  alignItems: string,
  isRow: boolean,
): void {
  for (const child of children) {
    if (child.fixedCrossSize !== undefined) {
      child.crossSize = child.fixedCrossSize;
    } else if (alignItems === 'stretch') {
      child.crossSize = availableCrossSize;
    } else {
      // Default to available size
      child.crossSize = availableCrossSize;
    }

    // Apply constraints
    if (isRow) {
      child.crossSize = clampHeight(child.crossSize, child.style);
    } else {
      child.crossSize = clampWidth(child.crossSize, child.style);
    }
  }
}

/**
 * Compute positions along the main axis based on justifyContent.
 *
 * @param children - Array of children with computed mainSize
 * @param availableMainSize - Total available main axis space
 * @param gap - Gap between children
 * @param justify - Justification mode
 * @returns Array of main-axis positions for each child
 */
export function computeMainPositions(
  children: FlexChild[],
  availableMainSize: number,
  gap: number,
  justify: string,
): number[] {
  if (children.length === 0) return [];

  const totalChildSize = children.reduce((sum, c) => sum + c.mainSize, 0);
  const totalGap = gap * (children.length - 1);
  const freeSpace = Math.max(0, availableMainSize - totalChildSize - totalGap);

  const positions: number[] = [];
  let offset = 0;

  switch (justify) {
    case 'center':
      offset = freeSpace / 2;
      break;
    case 'end':
      offset = freeSpace;
      break;
    case 'space-between': {
      // Space distributed between children (no space at edges)
      if (children.length > 1) {
        const spaceBetween = freeSpace / (children.length - 1);
        for (let i = 0; i < children.length; i++) {
          positions.push(offset);
          offset += children[i].mainSize + spaceBetween;
        }
        return positions;
      }
      // Single child: center it
      offset = freeSpace / 2;
      break;
    }
    case 'space-around': {
      const spaceAround = freeSpace / (children.length * 2);
      offset = spaceAround;
      for (let i = 0; i < children.length; i++) {
        positions.push(offset);
        offset += children[i].mainSize + spaceAround * 2;
      }
      return positions;
    }
    case 'space-evenly': {
      const spaceEvenly = freeSpace / (children.length + 1);
      offset = spaceEvenly;
      for (let i = 0; i < children.length; i++) {
        positions.push(offset);
        offset += children[i].mainSize + spaceEvenly;
      }
      return positions;
    }
    case 'start':
    default:
      offset = 0;
      break;
  }

  // Default flow: start/center/end
  for (let i = 0; i < children.length; i++) {
    positions.push(offset);
    offset += children[i].mainSize + gap;
  }

  return positions;
}

/**
 * Compute cross-axis positions based on alignItems.
 *
 * @param children - Array of children with computed crossSize
 * @param availableCrossSize - Total available cross axis space
 * @param alignItems - Alignment mode
 * @returns Array of cross-axis positions
 */
export function computeCrossPositions(
  children: FlexChild[],
  availableCrossSize: number,
  alignItems: string,
): number[] {
  return children.map((child) => {
    // Check individual alignSelf override
    const align = (child.style.alignSelf as string) || alignItems;

    switch (align) {
      case 'center':
        return (availableCrossSize - child.crossSize) / 2;
      case 'end':
        return availableCrossSize - child.crossSize;
      case 'stretch':
      case 'start':
      default:
        return 0;
    }
  });
}
