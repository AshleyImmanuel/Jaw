/**
 * @jaw/core - Node Types
 *
 * Defines the Universal Component Tree (UCT) node structure.
 * Every Jaw component ultimately produces JawNode instances.
 * These nodes are platform-agnostic -- they carry no DOM or native references.
 */

import type { JawStyle } from './style';
import type { JawEventHandler } from './events';
import type { LayoutRect } from './layout';

/** All built-in Jaw component types */
export type JawNodeType =
  | 'Box'
  | 'Row'
  | 'Column'
  | 'Text'
  | 'Button'
  | 'Image'
  | 'Spacer'
  | 'Scroll'
  | 'Fragment';

/** Flex direction for layout containers */
export type FlexDirection = 'row' | 'column';

/**
 * A single node in the Universal Component Tree.
 *
 * This is the core data structure that flows through the entire pipeline:
 * Compiler -> Runtime -> Layout Engine -> Renderer
 */
export interface JawNode {
  /** The component type (e.g., 'Box', 'Text', 'Button') */
  readonly type: JawNodeType | string;

  /** Props passed to the component */
  readonly props: JawProps;

  /** Ordered child nodes */
  readonly children: ReadonlyArray<JawNode>;

  /** Optional key for stable diffing */
  readonly key?: string | number;

  /** Brand field to distinguish JawNodes from plain objects */
  readonly __jaw: true;
}

/** A text node -- leaf node containing raw text content */
export interface JawTextNode {
  readonly type: 'Text';
  readonly props: JawProps & { content: string };
  readonly children: ReadonlyArray<never>;
  readonly key?: string | number;
  readonly __jaw: true;
}

/** Props that can be passed to any Jaw component */
export interface JawProps {
  /** Unique key for list rendering and diffing */
  key?: string | number;

  /** Inline styles */
  style?: JawStyle;

  /** Children -- set by createElement, not by the developer directly */
  children?: ReadonlyArray<JawNode> | JawNode | string | number;

  /** Event handlers */
  onPress?: JawEventHandler;
  onLongPress?: JawEventHandler;
  onPressIn?: JawEventHandler;
  onPressOut?: JawEventHandler;
  onLayout?: (layout: LayoutRect) => void;

  /** Image-specific */
  src?: string;
  alt?: string;

  /** Text content (for Text components) */
  content?: string;

  /** Button label shorthand */
  label?: string;

  /** Scroll direction */
  scrollDirection?: 'vertical' | 'horizontal' | 'both';

  /** Spacer size */
  size?: number;

  /** Allow any additional props for extensibility */
  [prop: string]: unknown;
}

/**
 * A Jaw component function.
 * Takes props and returns a JawNode tree.
 */
export type JawComponent<P extends JawProps = JawProps> = (props: P) => JawNode;

/**
 * What createElement accepts as the first argument:
 * either a built-in type string or a component function.
 */
export type JawElementType = JawNodeType | string | JawComponent;

/** Type guard: check if a value is a JawNode */
export function isJawNode(value: unknown): value is JawNode {
  return (
    typeof value === 'object' &&
    value !== null &&
    (value as JawNode).__jaw === true
  );
}

/** Type guard: check if a node is a text node */
export function isTextNode(node: JawNode): node is JawTextNode {
  return node.type === 'Text' && 'content' in node.props;
}

/** Create a raw JawNode (used internally by createElement) */
export function createNode(
  type: JawNodeType | string,
  props: JawProps,
  children: ReadonlyArray<JawNode>,
  key?: string | number,
): JawNode {
  return Object.freeze({
    type,
    props: Object.freeze(props),
    children: Object.freeze(children),
    key,
    __jaw: true as const,
  });
}
