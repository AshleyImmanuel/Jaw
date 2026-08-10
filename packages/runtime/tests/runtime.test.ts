/**
 * Runtime Tests
 *
 * Tests for createElement, state management, and event dispatch.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { createElement, Fragment } from '@jaw/runtime';
import { createState, setCurrentContext, createComponentContext, __resetAllState } from '@jaw/runtime';
import { isJawNode, isTextNode } from '@jaw/core';

describe('createElement', () => {
  it('creates a JawNode for intrinsic types', () => {
    const node = createElement('Box', { style: { width: 100 } });
    expect(isJawNode(node)).toBe(true);
    expect(node.type).toBe('Box');
    expect(node.props.style).toEqual({ width: 100 });
  });

  it('normalizes string children into Text nodes', () => {
    const node = createElement('Box', null, 'hello');
    expect(node.children).toHaveLength(1);
    expect(node.children[0].type).toBe('Text');
    expect(node.children[0].props.content).toBe('hello');
  });

  it('normalizes number children into Text nodes', () => {
    const node = createElement('Box', null, 42);
    expect(node.children).toHaveLength(1);
    expect(node.children[0].type).toBe('Text');
    expect(node.children[0].props.content).toBe('42');
  });

  it('filters out null and undefined children', () => {
    const node = createElement('Box', null, null, undefined, 'hello', false);
    expect(node.children).toHaveLength(1);
    expect(node.children[0].type).toBe('Text');
  });

  it('flattens array children', () => {
    const items = ['a', 'b', 'c'];
    const node = createElement('Box', null, ...items);
    expect(node.children).toHaveLength(3);
  });

  it('passes through JawNode children', () => {
    const child = createElement('Text', { content: 'hi' });
    const parent = createElement('Box', null, child);
    expect(parent.children).toHaveLength(1);
    expect(parent.children[0]).toBe(child);
  });

  it('calls component functions with props', () => {
    function MyComponent(props: any) {
      return createElement('Box', props);
    }
    const node = createElement(MyComponent, { style: { width: 50 } });
    expect(node.type).toBe('Box');
    expect(node.props.style).toEqual({ width: 50 });
  });

  it('extracts key from props', () => {
    const node = createElement('Box', { key: 'item-1', style: {} });
    expect(node.key).toBe('item-1');
    // Key should not be in props
    expect(node.props.key).toBeUndefined();
  });

  it('handles Fragment type', () => {
    const node = createElement(Fragment as any, null, 'hello');
    expect(node.children).toHaveLength(1);
  });
});

describe('createState', () => {
  beforeEach(() => {
    __resetAllState();
  });

  it('returns initial value via getter', () => {
    const ctx = createComponentContext();
    setCurrentContext(ctx);

    const [count] = createState(0);
    expect(count()).toBe(0);

    setCurrentContext(null);
  });

  it('updates value via setter', () => {
    const ctx = createComponentContext();
    setCurrentContext(ctx);

    const [count, setCount] = createState(0);
    setCount(5);
    expect(count()).toBe(5);

    setCurrentContext(null);
  });

  it('supports functional setter', () => {
    const ctx = createComponentContext();
    setCurrentContext(ctx);

    const [count, setCount] = createState(10);
    setCount(prev => prev + 5);
    expect(count()).toBe(15);

    setCurrentContext(null);
  });

  it('does not update when value is the same', () => {
    const ctx = createComponentContext();
    setCurrentContext(ctx);

    const [count, setCount] = createState(42);
    setCount(42);
    expect(count()).toBe(42);

    setCurrentContext(null);
  });

  it('throws when called outside component', () => {
    setCurrentContext(null);
    expect(() => createState(0)).toThrow();
  });
});
