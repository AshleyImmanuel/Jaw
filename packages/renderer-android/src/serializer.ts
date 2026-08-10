import type { LayoutBox, JawNode } from '@jaw/core';

/**
 * AndroidRenderNode represents a serialized, flattened instruction
 * for the Native Android side to render.
 */
export interface AndroidRenderNode {
  id: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  props: Record<string, any>;
  children: AndroidRenderNode[];
}

/**
 * Recursively serializes a LayoutBox tree into an AndroidRenderNode tree.
 * The Android host will parse this JSON to construct native Views.
 */
export function serializeRenderPlan(layout: LayoutBox, idPrefix = 'root'): AndroidRenderNode {
  const node = layout.node;
  
  // Clean up props for serialization (remove functions, symbols, etc.)
  const serializedProps: Record<string, any> = {};
  for (const [key, value] of Object.entries(node.props)) {
    if (typeof value !== 'function' && typeof value !== 'symbol') {
      serializedProps[key] = value;
    }
  }

  const serializedChildren = layout.children.map((child, index) => 
    serializeRenderPlan(child, `${idPrefix}-${index}`)
  );

  return {
    id: idPrefix,
    type: node.type,
    x: layout.x,
    y: layout.y,
    width: layout.width,
    height: layout.height,
    props: serializedProps,
    children: serializedChildren,
  };
}
