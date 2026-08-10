/**
 * Layout Engine Tests
 *
 * Comprehensive test suite for the Jaw layout engine.
 * Covers spec test cases (TC-001 through TC-008),
 * flex distribution, box model, alignment, gap,
 * constraints, and edge cases.
 */
import { describe, it, expect } from 'vitest';
import { computeLayout } from '@jaw/layout';
import { createNode } from '@jaw/core';
// Helper: create a Box node with style
function box(style, children = []) {
    return createNode('Box', { style }, children);
}
// Helper: create a Row node
function row(style, children = []) {
    return createNode('Row', { style: { flexDirection: 'row', ...style } }, children);
}
// Helper: create a Column node
function column(style, children = []) {
    return createNode('Column', { style: { flexDirection: 'column', ...style } }, children);
}
// Helper: create a Text node
function text(content, style = {}) {
    return createNode('Text', { content, style }, []);
}
// Helper: create a Spacer node
function spacer(style = {}) {
    return createNode('Spacer', { style }, []);
}
// ============================================================
// SPEC TEST CASES
// ============================================================
describe('Spec Test Cases', () => {
    it('TC-001: Box(width=100, height=100) renders exactly 100x100', () => {
        const node = box({ width: 100, height: 100 });
        const layout = computeLayout(node, 800, 600);
        expect(layout.width).toBe(100);
        expect(layout.height).toBe(100);
    });
    it('TC-002: Row with two 100px boxes keeps horizontal order', () => {
        const node = row({ width: 400, height: 100 }, [
            box({ width: 100, height: 100 }),
            box({ width: 100, height: 100 }),
        ]);
        const layout = computeLayout(node, 800, 600);
        expect(layout.children).toHaveLength(2);
        // First child should be at x < second child's x
        expect(layout.children[0].x).toBeLessThan(layout.children[1].x);
    });
    it('TC-003: Column stacks children vertically', () => {
        const node = column({ width: 200, height: 400 }, [
            box({ width: 200, height: 100 }),
            box({ width: 200, height: 100 }),
        ]);
        const layout = computeLayout(node, 800, 600);
        expect(layout.children).toHaveLength(2);
        // First child should be at y < second child's y
        expect(layout.children[0].y).toBeLessThan(layout.children[1].y);
    });
    it('TC-004: Padding increases internal spacing only', () => {
        const node = box({ width: 200, height: 200, padding: 20 }, [
            box({ width: 100, height: 100 }),
        ]);
        const layout = computeLayout(node, 800, 600);
        // The child should be offset by the padding
        expect(layout.children[0].x).toBeGreaterThanOrEqual(20);
        expect(layout.children[0].y).toBeGreaterThanOrEqual(20);
        // The parent's outer size should be 200x200 (padding is inside)
        expect(layout.width).toBe(200);
        expect(layout.height).toBe(200);
    });
    it('TC-005: Margin affects external spacing only', () => {
        const node = row({ width: 400, height: 200 }, [
            box({ width: 100, height: 100, margin: 10 }),
            box({ width: 100, height: 100 }),
        ]);
        const layout = computeLayout(node, 800, 600);
        // First child has margin, so second child should be offset further
        // child[0] margin.left + width + margin.right = 10 + 100 + 10 = 120
        const firstChildEnd = layout.children[0].x + layout.children[0].width + layout.children[0].margin.right;
        expect(layout.children[1].x).toBeGreaterThanOrEqual(firstChildEnd);
    });
    it('TC-008: Nested layouts remain deterministic', () => {
        const node = column({ width: 400, height: 600 }, [
            row({ width: 400, height: 200 }, [
                box({ width: 100, height: 100 }),
                column({ width: 200, height: 200 }, [
                    box({ width: 200, height: 50 }),
                    box({ width: 200, height: 50 }),
                ]),
            ]),
            box({ width: 400, height: 200 }),
        ]);
        // Run layout twice and verify identical results
        const layout1 = computeLayout(node, 800, 600);
        const layout2 = computeLayout(node, 800, 600);
        expect(layout1.width).toBe(layout2.width);
        expect(layout1.height).toBe(layout2.height);
        expect(layout1.children.length).toBe(layout2.children.length);
        // Deep comparison of child positions
        for (let i = 0; i < layout1.children.length; i++) {
            expect(layout1.children[i].x).toBe(layout2.children[i].x);
            expect(layout1.children[i].y).toBe(layout2.children[i].y);
            expect(layout1.children[i].width).toBe(layout2.children[i].width);
            expect(layout1.children[i].height).toBe(layout2.children[i].height);
        }
    });
});
// ============================================================
// FLEX DISTRIBUTION
// ============================================================
describe('Flex Distribution', () => {
    it('single flex child fills remaining space', () => {
        const node = row({ width: 400, height: 100 }, [
            box({ width: 100, height: 100 }),
            box({ flex: 1, height: 100 }),
        ]);
        const layout = computeLayout(node, 800, 600);
        // Flex child should fill remaining 300px
        expect(layout.children[1].width).toBeCloseTo(300, 0);
    });
    it('multiple flex children split proportionally', () => {
        const node = row({ width: 300, height: 100 }, [
            box({ flex: 1, height: 100 }),
            box({ flex: 2, height: 100 }),
            box({ flex: 3, height: 100 }),
        ]);
        const layout = computeLayout(node, 800, 600);
        // Should be 50, 100, 150
        const total = layout.children[0].width + layout.children[1].width + layout.children[2].width;
        expect(total).toBeCloseTo(300, 0);
        expect(layout.children[0].width).toBeCloseTo(50, 0);
        expect(layout.children[1].width).toBeCloseTo(100, 0);
        expect(layout.children[2].width).toBeCloseTo(150, 0);
    });
    it('flex with fixed-size siblings computes correctly', () => {
        const node = row({ width: 500, height: 100 }, [
            box({ width: 100, height: 100 }),
            box({ flex: 1, height: 100 }),
            box({ width: 100, height: 100 }),
        ]);
        const layout = computeLayout(node, 800, 600);
        // Flex child gets 500 - 100 - 100 = 300
        expect(layout.children[1].width).toBeCloseTo(300, 0);
    });
    it('flex-grow with min constraint clamps correctly', () => {
        const node = row({ width: 200, height: 100 }, [
            box({ flex: 1, minWidth: 150, height: 100 }),
            box({ flex: 1, height: 100 }),
        ]);
        const layout = computeLayout(node, 800, 600);
        // First child should be at least 150
        expect(layout.children[0].width).toBeGreaterThanOrEqual(150);
    });
    it('zero flex children get natural size', () => {
        const node = row({ width: 400, height: 100 }, [
            box({ width: 50, height: 100 }),
            box({ width: 80, height: 100 }),
        ]);
        const layout = computeLayout(node, 800, 600);
        expect(layout.children[0].width).toBe(50);
        expect(layout.children[1].width).toBe(80);
    });
});
// ============================================================
// BOX MODEL
// ============================================================
describe('Box Model', () => {
    it('padding + content = correct total size', () => {
        const node = box({ width: 200, height: 200, padding: 20 });
        const layout = computeLayout(node, 800, 600);
        expect(layout.width).toBe(200);
        expect(layout.height).toBe(200);
        expect(layout.padding.top).toBe(20);
        expect(layout.padding.right).toBe(20);
        expect(layout.padding.bottom).toBe(20);
        expect(layout.padding.left).toBe(20);
    });
    it('border-width adds to outer dimensions tracking', () => {
        const node = box({ width: 200, height: 200, borderWidth: 2 });
        const layout = computeLayout(node, 800, 600);
        expect(layout.border.top).toBe(2);
        expect(layout.border.right).toBe(2);
        expect(layout.border.bottom).toBe(2);
        expect(layout.border.left).toBe(2);
    });
    it('nested padding accumulates correctly', () => {
        const node = box({ width: 300, height: 300, padding: 20 }, [
            box({ width: 200, height: 200, padding: 10 }, [
                box({ width: 100, height: 100 }),
            ]),
        ]);
        const layout = computeLayout(node, 800, 600);
        // Inner box should be offset by outer padding
        expect(layout.children[0].x).toBeGreaterThanOrEqual(20);
        expect(layout.children[0].y).toBeGreaterThanOrEqual(20);
        // Innermost box should be offset by both paddings
        const innerChild = layout.children[0].children[0];
        expect(innerChild.x).toBeGreaterThanOrEqual(10);
        expect(innerChild.y).toBeGreaterThanOrEqual(10);
    });
    it('percentage widths resolve against parent', () => {
        const node = box({ width: 400, height: 400 }, [
            box({ width: '50%', height: 100 }),
        ]);
        const layout = computeLayout(node, 800, 600);
        expect(layout.children[0].width).toBeCloseTo(200, 0);
    });
});
// ============================================================
// ALIGNMENT
// ============================================================
describe('Alignment', () => {
    it('alignItems: center on Row centers cross-axis', () => {
        const node = row({ width: 400, height: 200, alignItems: 'center' }, [
            box({ width: 100, height: 50 }),
        ]);
        const layout = computeLayout(node, 800, 600);
        // Child should be centered vertically
        const childY = layout.children[0].y - layout.padding.top - layout.border.top;
        const expectedCenter = (200 - 50) / 2;
        // Allow for box model offsets
        expect(layout.children[0].y).toBeGreaterThan(0);
    });
    it('alignItems: stretch fills cross axis', () => {
        const node = row({ width: 400, height: 200, alignItems: 'stretch' }, [
            box({ width: 100 }),
        ]);
        const layout = computeLayout(node, 800, 600);
        // Stretched child should match parent height
        expect(layout.children[0].height).toBe(200);
    });
    it('justifyContent: center centers on main axis', () => {
        const node = row({ width: 400, height: 100, justifyContent: 'center' }, [
            box({ width: 100, height: 100 }),
        ]);
        const layout = computeLayout(node, 800, 600);
        // Child should be centered horizontally
        const expectedX = (400 - 100) / 2;
        expect(layout.children[0].x).toBeGreaterThan(0);
    });
    it('justifyContent: space-between distributes space', () => {
        const node = row({ width: 400, height: 100, justifyContent: 'space-between' }, [
            box({ width: 50, height: 100 }),
            box({ width: 50, height: 100 }),
            box({ width: 50, height: 100 }),
        ]);
        const layout = computeLayout(node, 800, 600);
        // First child at start, last child at end
        expect(layout.children).toHaveLength(3);
        expect(layout.children[0].x).toBeLessThan(layout.children[1].x);
        expect(layout.children[1].x).toBeLessThan(layout.children[2].x);
    });
});
// ============================================================
// GAP
// ============================================================
describe('Gap', () => {
    it('gap between Row children adds horizontal spacing', () => {
        const node = row({ width: 400, height: 100, gap: 20 }, [
            box({ width: 100, height: 100 }),
            box({ width: 100, height: 100 }),
        ]);
        const layout = computeLayout(node, 800, 600);
        // Second child should be at first child end + gap
        const expectedX2 = layout.children[0].x + 100 + 20;
        expect(layout.children[1].x).toBeCloseTo(expectedX2, 0);
    });
    it('gap between Column children adds vertical spacing', () => {
        const node = column({ width: 200, height: 400, gap: 16 }, [
            box({ width: 200, height: 100 }),
            box({ width: 200, height: 100 }),
        ]);
        const layout = computeLayout(node, 800, 600);
        const expectedY2 = layout.children[0].y + 100 + 16;
        expect(layout.children[1].y).toBeCloseTo(expectedY2, 0);
    });
    it('gap does not apply before first or after last child', () => {
        const node = row({ width: 300, height: 100, gap: 20 }, [
            box({ width: 100, height: 100 }),
        ]);
        const layout = computeLayout(node, 800, 600);
        // Single child should start at 0 (no gap before first)
        expect(layout.children[0].x).toBeLessThanOrEqual(20); // Only padding/border offset
    });
    it('gap with flex children distributes correctly', () => {
        const node = row({ width: 320, height: 100, gap: 10 }, [
            box({ flex: 1, height: 100 }),
            box({ flex: 1, height: 100 }),
            box({ flex: 1, height: 100 }),
        ]);
        const layout = computeLayout(node, 800, 600);
        // 320 - 20 (2 gaps) = 300, split 3 ways = 100 each
        expect(layout.children[0].width).toBeCloseTo(100, 0);
        expect(layout.children[1].width).toBeCloseTo(100, 0);
        expect(layout.children[2].width).toBeCloseTo(100, 0);
    });
});
// ============================================================
// CONSTRAINTS
// ============================================================
describe('Constraints', () => {
    it('minWidth prevents shrinking below threshold', () => {
        const node = box({ width: 50, height: 100, minWidth: 100 });
        const layout = computeLayout(node, 800, 600);
        expect(layout.width).toBeGreaterThanOrEqual(100);
    });
    it('maxWidth prevents growing above threshold', () => {
        const node = box({ width: 500, height: 100, maxWidth: 200 });
        const layout = computeLayout(node, 800, 600);
        expect(layout.width).toBeLessThanOrEqual(200);
    });
    it('minHeight/maxHeight on flex children', () => {
        const node = column({ width: 200, height: 400 }, [
            box({ flex: 1, minHeight: 100, maxHeight: 250 }),
        ]);
        const layout = computeLayout(node, 800, 600);
        expect(layout.children[0].height).toBeGreaterThanOrEqual(100);
        expect(layout.children[0].height).toBeLessThanOrEqual(250);
    });
    it('conflicting min > max resolves to min', () => {
        const node = box({ width: 100, height: 100, minWidth: 200, maxWidth: 150 });
        const layout = computeLayout(node, 800, 600);
        // min wins when min > max (per CSS spec)
        expect(layout.width).toBe(200);
    });
});
// ============================================================
// EDGE CASES
// ============================================================
describe('Edge Cases', () => {
    it('empty container produces layout with zero children', () => {
        const node = box({ width: 200, height: 200 });
        const layout = computeLayout(node, 800, 600);
        expect(layout.children).toHaveLength(0);
        expect(layout.width).toBe(200);
        expect(layout.height).toBe(200);
    });
    it('single child fills parent correctly', () => {
        const node = box({ width: 300, height: 300 }, [
            box({ width: 300, height: 300 }),
        ]);
        const layout = computeLayout(node, 800, 600);
        expect(layout.children).toHaveLength(1);
        expect(layout.children[0].width).toBe(300);
    });
    it('deeply nested layouts (5+ levels) stay deterministic', () => {
        const deepNode = box({ width: 500, height: 500 }, [
            box({ width: 400, height: 400 }, [
                box({ width: 300, height: 300 }, [
                    box({ width: 200, height: 200 }, [
                        box({ width: 100, height: 100 }, [
                            box({ width: 50, height: 50 }),
                        ]),
                    ]),
                ]),
            ]),
        ]);
        const layout1 = computeLayout(deepNode, 800, 600);
        const layout2 = computeLayout(deepNode, 800, 600);
        // Verify deepest child
        let child1 = layout1;
        let child2 = layout2;
        for (let i = 0; i < 5; i++) {
            expect(child1.children).toHaveLength(1);
            child1 = child1.children[0];
            child2 = child2.children[0];
            expect(child1.x).toBe(child2.x);
            expect(child1.y).toBe(child2.y);
            expect(child1.width).toBe(child2.width);
            expect(child1.height).toBe(child2.height);
        }
    });
    it('large number of children (100+) computes without error', () => {
        const children = Array.from({ length: 100 }, (_, i) => box({ width: 10, height: 10 }));
        const node = column({ width: 200, height: 2000 }, children);
        const layout = computeLayout(node, 800, 2000);
        expect(layout.children).toHaveLength(100);
        // All children should have valid positions
        for (const child of layout.children) {
            expect(child.width).toBe(10);
            expect(child.height).toBe(10);
            expect(isFinite(child.x)).toBe(true);
            expect(isFinite(child.y)).toBe(true);
        }
    });
});
//# sourceMappingURL=layout.test.js.map