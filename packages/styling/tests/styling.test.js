/**
 * Styling Engine Tests
 *
 * Tests for normalization, merging, defaults, and validation.
 */
import { describe, it, expect } from 'vitest';
import { normalizeStyle, resolveEdges, mergeStyles, mergeStyleList, getDefaultStyles, validateStyle } from '@jaw/styling';
describe('normalizeStyle', () => {
    it('expands margin shorthand number', () => {
        const result = normalizeStyle({ margin: 10 });
        expect(result.marginTop).toBe(10);
        expect(result.marginRight).toBe(10);
        expect(result.marginBottom).toBe(10);
        expect(result.marginLeft).toBe(10);
        expect(result.margin).toBeUndefined();
    });
    it('expands padding shorthand number', () => {
        const result = normalizeStyle({ padding: 8 });
        expect(result.paddingTop).toBe(8);
        expect(result.paddingRight).toBe(8);
        expect(result.paddingBottom).toBe(8);
        expect(result.paddingLeft).toBe(8);
    });
    it('individual overrides take priority', () => {
        const result = normalizeStyle({ margin: 10, marginTop: 20 });
        expect(result.marginTop).toBe(20);
        expect(result.marginRight).toBe(10);
    });
});
describe('resolveEdges', () => {
    it('resolves number to all edges', () => {
        const result = resolveEdges(10);
        expect(result).toEqual({ top: 10, right: 10, bottom: 10, left: 10 });
    });
    it('resolves object edges', () => {
        const result = resolveEdges({ top: 1, right: 2, bottom: 3, left: 4 });
        expect(result).toEqual({ top: 1, right: 2, bottom: 3, left: 4 });
    });
    it('resolves undefined to zeros', () => {
        const result = resolveEdges(undefined);
        expect(result).toEqual({ top: 0, right: 0, bottom: 0, left: 0 });
    });
});
describe('mergeStyles', () => {
    it('override takes priority', () => {
        const result = mergeStyles({ width: 100 }, { width: 200 });
        expect(result.width).toBe(200);
    });
    it('preserves base when no override', () => {
        const result = mergeStyles({ width: 100, height: 50 }, undefined);
        expect(result.width).toBe(100);
        expect(result.height).toBe(50);
    });
});
describe('mergeStyleList', () => {
    it('merges multiple styles in order', () => {
        const result = mergeStyleList({ width: 100 }, { height: 50 }, { width: 200 });
        expect(result.width).toBe(200);
        expect(result.height).toBe(50);
    });
});
describe('getDefaultStyles', () => {
    it('returns defaults for Box', () => {
        const defaults = getDefaultStyles('Box');
        expect(defaults.flexDirection).toBe('column');
    });
    it('returns defaults for Text', () => {
        const defaults = getDefaultStyles('Text');
        expect(defaults.fontSize).toBe(16);
    });
    it('returns empty for unknown type', () => {
        const defaults = getDefaultStyles('Unknown');
        expect(Object.keys(defaults)).toHaveLength(0);
    });
});
describe('validateStyle', () => {
    it('valid style passes', () => {
        const result = validateStyle({ width: 100, height: 50 });
        expect(result.valid).toBe(true);
        expect(result.errors).toHaveLength(0);
    });
    it('flags unsupported properties', () => {
        const result = validateStyle({ filter: 'blur(5px)' });
        expect(result.warnings.length).toBeGreaterThan(0);
    });
    it('flags invalid opacity', () => {
        const result = validateStyle({ opacity: 2 });
        expect(result.errors.length).toBeGreaterThan(0);
    });
    it('flags invalid flexDirection', () => {
        const result = validateStyle({ flexDirection: 'diagonal' });
        expect(result.errors.length).toBeGreaterThan(0);
    });
});
//# sourceMappingURL=styling.test.js.map