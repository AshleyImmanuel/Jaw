/**
 * @jaw/runtime - createElement
 *
 * The JSX factory function. When TypeScript compiles JSX like:
 *   <Box style={{ width: 100 }}>Hello</Box>
 *
 * It transforms it to:
 *   Jaw.createElement(Box, { style: { width: 100 } }, "Hello")
 *
 * This function produces JawNode instances that form the
 * Universal Component Tree.
 */

import type {
  JawNode,
  JawProps,
  JawElementType,
  JawNodeType,
  JawComponent,
} from '@jaw/core';
import { createNode, isJawNode } from '@jaw/core';

/** Built-in node types that map to intrinsic elements */
const INTRINSIC_TYPES = new Set<string>([
  'Box', 'Row', 'Column', 'Text', 'Button',
  'Image', 'Spacer', 'Scroll', 'Fragment',
]);

/**
 * Convert a raw child value into a JawNode.
 * - Strings and numbers become Text nodes
 * - null/undefined/boolean are filtered out
 * - Arrays are flattened
 * - JawNodes pass through as-is
 */
function normalizeChild(child: unknown): JawNode | null {
  if (child === null || child === undefined || typeof child === 'boolean') {
    return null;
  }

  if (typeof child === 'string') {
    return createNode('Text', { content: child }, [], undefined);
  }

  if (typeof child === 'number') {
    return createNode('Text', { content: String(child) }, [], undefined);
  }

  if (isJawNode(child)) {
    return child;
  }

  return null;
}

/**
 * Flatten and normalize an array of children into JawNode[].
 */
function normalizeChildren(rawChildren: unknown[]): JawNode[] {
  const result: JawNode[] = [];

  for (const child of rawChildren) {
    if (Array.isArray(child)) {
      // Recursively flatten arrays (e.g., from .map())
      result.push(...normalizeChildren(child));
    } else {
      const normalized = normalizeChild(child);
      if (normalized !== null) {
        result.push(normalized);
      }
    }
  }

  return result;
}

/**
 * The Jaw JSX factory.
 *
 * Handles both intrinsic elements (Box, Text, etc.) and
 * component functions.
 *
 * @param type - A string type name or a component function
 * @param props - Props object (may be null from JSX)
 * @param children - Remaining arguments are children
 * @returns A JawNode
 */
export function createElement(
  type: JawElementType,
  props: JawProps | null,
  ...children: unknown[]
): JawNode {
  const resolvedProps: JawProps = { ...(props ?? {}) };
  const key = resolvedProps.key;

  // Remove key from props (it's stored on the node, not in props)
  delete resolvedProps.key;

  // Normalize children
  const normalizedChildren = normalizeChildren(children);

  // If type is a function (component), call it with props + children
  if (typeof type === 'function') {
    const component = type as JawComponent;
    resolvedProps.children = normalizedChildren;
    return component(resolvedProps);
  }

  // Otherwise it's an intrinsic element type
  const nodeType = type as JawNodeType;

  if (!INTRINSIC_TYPES.has(nodeType)) {
    console.warn(`[Jaw] Unknown element type: "${nodeType}"`);
  }

  return createNode(nodeType, resolvedProps, normalizedChildren, key);
}

/**
 * Fragment support.
 * <></> compiles to Jaw.createElement(Jaw.Fragment, null, ...children)
 */
export const Fragment = 'Fragment';
