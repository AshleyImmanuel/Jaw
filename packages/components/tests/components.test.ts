/**
 * Components Tests
 *
 * Tests that each component produces valid JawNode output.
 */

import { describe, it, expect } from 'vitest';
import { Box, Row, Column, Text, Button, Image, Spacer, Scroll } from '@jaw/components';
import { isJawNode, createNode } from '@jaw/core';

describe('Box', () => {
  it('produces a valid JawNode', () => {
    const node = Box({ style: { width: 100 } });
    expect(isJawNode(node)).toBe(true);
    expect(node.type).toBe('Box');
  });

  it('includes children', () => {
    const child = createNode('Text', { content: 'hi' }, []);
    const node = Box({ children: [child] });
    expect(node.children).toHaveLength(1);
  });
});

describe('Row', () => {
  it('has flexDirection row', () => {
    const node = Row({});
    expect(node.type).toBe('Row');
    expect((node.props.style as any).flexDirection).toBe('row');
  });
});

describe('Column', () => {
  it('has flexDirection column', () => {
    const node = Column({});
    expect(node.type).toBe('Column');
    expect((node.props.style as any).flexDirection).toBe('column');
  });
});

describe('Text', () => {
  it('stores content in props', () => {
    const node = Text({ content: 'Hello' });
    expect(node.type).toBe('Text');
    expect(node.props.content).toBe('Hello');
  });

  it('is a leaf node (no children)', () => {
    const node = Text({ content: 'Hello' });
    expect(node.children).toHaveLength(0);
  });

  it('accepts children string as content', () => {
    const node = Text({ children: 'World' });
    expect(node.props.content).toBe('World');
  });
});

describe('Button', () => {
  it('creates a Button node', () => {
    const node = Button({ label: 'Click' });
    expect(node.type).toBe('Button');
  });

  it('creates Text child from label', () => {
    const node = Button({ label: 'Click' });
    expect(node.children).toHaveLength(1);
    expect(node.children[0].type).toBe('Text');
    expect(node.children[0].props.content).toBe('Click');
  });

  it('removes onPress when disabled', () => {
    const handler = () => {};
    const node = Button({ onPress: handler, disabled: true, label: 'X' });
    expect(node.props.onPress).toBeUndefined();
  });
});

describe('Image', () => {
  it('stores src and alt', () => {
    const node = Image({ src: '/logo.png', alt: 'Logo' });
    expect(node.type).toBe('Image');
    expect(node.props.src).toBe('/logo.png');
    expect(node.props.alt).toBe('Logo');
  });

  it('is a leaf node', () => {
    const node = Image({ src: '/logo.png' });
    expect(node.children).toHaveLength(0);
  });
});

describe('Spacer', () => {
  it('defaults to flex: 1', () => {
    const node = Spacer({});
    expect(node.type).toBe('Spacer');
    expect((node.props.style as any).flex).toBe(1);
  });

  it('uses fixed size when provided', () => {
    const node = Spacer({ size: 20 });
    expect((node.props.style as any).width).toBe(20);
    expect((node.props.style as any).height).toBe(20);
  });
});

describe('Scroll', () => {
  it('creates a Scroll node', () => {
    const node = Scroll({});
    expect(node.type).toBe('Scroll');
  });

  it('sets overflow based on direction', () => {
    const node = Scroll({ scrollDirection: 'horizontal' });
    expect((node.props.style as any).overflowX).toBe('scroll');
    expect((node.props.style as any).overflowY).toBe('hidden');
  });
});
