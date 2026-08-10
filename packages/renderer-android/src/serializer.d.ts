import type { LayoutBox } from '@jaw/core';
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
export declare function serializeRenderPlan(layout: LayoutBox, idPrefix?: string): AndroidRenderNode;
//# sourceMappingURL=serializer.d.ts.map