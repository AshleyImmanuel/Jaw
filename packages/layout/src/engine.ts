/**
 * @jaw/layout - Engine
 *
 * The main layout algorithm. Takes a JawNode tree and produces
 * a LayoutBox tree with computed positions and sizes.
 *
 * This is a flexbox-inspired, deterministic layout engine.
 * It is platform-independent -- no DOM or native APIs.
 */

import type { JawNode, JawStyle, LayoutBox, ResolvedEdges, MeasureFunction } from '@jaw/core';
import { mergeStyles } from '@jaw/styling';
import { getDefaultStyles } from '@jaw/styling';
import { resolveBoxModel, horizontalBoxSpace, verticalBoxSpace } from './box-model';
import { clampWidth, clampHeight, resolveDimension } from './constraints';
import {
  distributeFlexSpace,
  computeCrossSizes,
  computeMainPositions,
  computeCrossPositions,
  type FlexChild,
} from './flex';

const ZERO_EDGES: ResolvedEdges = { top: 0, right: 0, bottom: 0, left: 0 };

/**
 * Compute layout for a JawNode tree.
 *
 * This is the main entry point for the layout engine.
 * It takes the root node and the container dimensions, and returns
 * a fully laid-out LayoutBox tree.
 *
 * @param rootNode - The root JawNode to lay out
 * @param containerWidth - Available width from the container
 * @param containerHeight - Available height from the container
 * @param measureText - Optional function to measure text nodes intrinsically
 * @returns A LayoutBox tree with computed geometry
 */
export function computeLayout(
  rootNode: JawNode,
  containerWidth: number,
  containerHeight: number,
  measureText?: MeasureFunction
): LayoutBox {
  return layoutNode(rootNode, containerWidth, containerHeight, measureText);
}

/**
 * Layout a single node within the given available space.
 *
 * This is the recursive workhorse. For each node:
 * 1. Resolve styles (defaults + user styles)
 * 2. Resolve the box model (margin, padding, border)
 * 3. Determine own size (fixed or flex)
 * 4. Layout children (recursive)
 * 5. Position children based on flex direction, alignment, etc.
 */
function layoutNode(
  node: JawNode,
  availableWidth: number,
  availableHeight: number,
  measureText?: MeasureFunction
): LayoutBox {
  // Resolve styles: component defaults + user styles
  const defaultStyle = getDefaultStyles(node.type);
  const style = mergeStyles(defaultStyle, node.props.style as JawStyle | undefined);

  // Resolve box model
  const boxModel = resolveBoxModel(style);

  // Determine flex direction
  const isRow = (style.flexDirection ?? 'column') === 'row';

  // Calculate own content area (available - box model spacing)
  const hBoxSpace = horizontalBoxSpace(boxModel);
  const vBoxSpace = verticalBoxSpace(boxModel);

  // Resolve own dimensions
  let ownWidth = resolveDimension(style.width, availableWidth);
  let ownHeight = resolveDimension(style.height, availableHeight);

  // If no explicit size, use available space
  if (ownWidth === undefined) ownWidth = availableWidth;
  if (ownHeight === undefined) ownHeight = availableHeight;

  // Apply constraints
  ownWidth = clampWidth(ownWidth, style);
  ownHeight = clampHeight(ownHeight, style);

  // Content area is own size minus box model spacing
  const contentWidth = Math.max(0, ownWidth - hBoxSpace);
  const contentHeight = Math.max(0, ownHeight - vBoxSpace);

  // Handle intrinsic measurement for Text nodes
  if (node.type === 'Text' && measureText) {
    const content = typeof node.props.content === 'string' ? node.props.content : '';
    const measuredSize = measureText({
      content,
      fontSize: style.fontSize,
      fontWeight: style.fontWeight,
      fontFamily: style.fontFamily,
      lineHeight: style.lineHeight,
      letterSpacing: style.letterSpacing,
      availableWidth: availableWidth - hBoxSpace,
    });
    
    // Override width and height with measured size if they weren't explicitly set
    if (style.width === undefined) ownWidth = measuredSize.width + hBoxSpace;
    if (style.height === undefined) ownHeight = measuredSize.height + vBoxSpace;
    
    // Re-apply constraints just in case
    ownWidth = clampWidth(ownWidth, style);
    ownHeight = clampHeight(ownHeight, style);
  }

  // Handle leaf nodes (Text, Image, Spacer)
  if (isLeafNode(node)) {
    return createLayoutBox(node, ownWidth - boxModel.margin.left - boxModel.margin.right, ownHeight - boxModel.margin.top - boxModel.margin.bottom, boxModel, []);
  }

  // Layout children
  const childNodes = node.children;
  if (childNodes.length === 0) {
    return createLayoutBox(node, ownWidth - boxModel.margin.left - boxModel.margin.right, ownHeight - boxModel.margin.top - boxModel.margin.bottom, boxModel, []);
  }

  const gap = typeof style.gap === 'number' ? style.gap : 0;
  const alignItems = (style.alignItems as string) ?? 'stretch';
  const justifyContent = (style.justifyContent as string) ?? 'start';

  // Prepare flex children
  const flexChildren: FlexChild[] = childNodes.map((child, index) => {
    const childDefaults = getDefaultStyles(child.type);
    const childStyle = mergeStyles(childDefaults, child.props.style as JawStyle | undefined);
    const childBoxModel = resolveBoxModel(childStyle);
    const childHBoxSpace = horizontalBoxSpace(childBoxModel);
    const childVBoxSpace = verticalBoxSpace(childBoxModel);

    const flex = (childStyle.flex as number) ?? (childStyle.flexGrow as number) ?? 0;

    // Resolve fixed sizes
    let fixedMainSize: number | undefined;
    let fixedCrossSize: number | undefined;

    if (isRow) {
      fixedMainSize = resolveDimension(childStyle.width, contentWidth);
      fixedCrossSize = resolveDimension(childStyle.height, contentHeight);
      if (fixedMainSize !== undefined) fixedMainSize = fixedMainSize;
      if (fixedCrossSize !== undefined) fixedCrossSize = fixedCrossSize;
    } else {
      fixedMainSize = resolveDimension(childStyle.height, contentHeight);
      fixedCrossSize = resolveDimension(childStyle.width, contentWidth);
      if (fixedMainSize !== undefined) fixedMainSize = fixedMainSize;
      if (fixedCrossSize !== undefined) fixedCrossSize = fixedCrossSize;
    }

    return {
      index,
      style: childStyle,
      fixedMainSize,
      fixedCrossSize,
      flex,
      mainSize: 0,
      crossSize: 0,
    };
  });

  // Distribute main-axis space
  const availableMainSize = isRow ? contentWidth : contentHeight;
  const availableCrossSize = isRow ? contentHeight : contentWidth;

  distributeFlexSpace(flexChildren, availableMainSize, gap, isRow);
  computeCrossSizes(flexChildren, availableCrossSize, alignItems, isRow);

  // Compute positions
  const mainPositions = computeMainPositions(
    flexChildren, availableMainSize, gap, justifyContent,
  );
  const crossPositions = computeCrossPositions(
    flexChildren, availableCrossSize, alignItems,
  );

  // Recursively layout each child
  const childLayoutBoxes: LayoutBox[] = [];

  for (let i = 0; i < childNodes.length; i++) {
    const fc = flexChildren[i];
    const childWidth = isRow ? fc.mainSize : fc.crossSize;
    const childHeight = isRow ? fc.crossSize : fc.mainSize;

    // Recursively layout the child.
    // Pass the parent's content dimensions so that percentage-based
    // widths/heights in children resolve against the parent's content area,
    // not against the already-computed flex size.
    const childLayout = layoutNode(childNodes[i], contentWidth, contentHeight, measureText);
    // Override with flex-computed dimensions
    childLayout.width = Math.max(0, childWidth - childLayout.margin.left - childLayout.margin.right);
    childLayout.height = Math.max(0, childHeight - childLayout.margin.top - childLayout.margin.bottom);

    // Position relative to content area
    const mainPos = mainPositions[i] ?? 0;
    const crossPos = crossPositions[i] ?? 0;

    childLayout.x = (isRow ? mainPos : crossPos) +
      boxModel.padding.left + boxModel.border.left +
      childLayout.margin.left;
    childLayout.y = (isRow ? crossPos : mainPos) +
      boxModel.padding.top + boxModel.border.top +
      childLayout.margin.top;

    childLayoutBoxes.push(childLayout);
  }

  return createLayoutBox(
    node,
    ownWidth - boxModel.margin.left - boxModel.margin.right,
    ownHeight - boxModel.margin.top - boxModel.margin.bottom,
    boxModel,
    childLayoutBoxes,
  );
}

/**
 * Check if a node is a leaf (no children to layout).
 */
function isLeafNode(node: JawNode): boolean {
  return (
    node.type === 'Text' ||
    node.type === 'Image' ||
    node.type === 'Spacer' ||
    node.children.length === 0
  );
}

/**
 * Create a LayoutBox from computed values.
 */
function createLayoutBox(
  node: JawNode,
  width: number,
  height: number,
  boxModel: { margin: ResolvedEdges; padding: ResolvedEdges; border: ResolvedEdges },
  children: LayoutBox[],
): LayoutBox {
  return {
    node,
    x: 0,
    y: 0,
    width: Math.max(0, width),
    height: Math.max(0, height),
    margin: boxModel.margin,
    padding: boxModel.padding,
    border: boxModel.border,
    children,
  };
}
