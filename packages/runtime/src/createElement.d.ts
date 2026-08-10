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
import type { JawNode, JawProps, JawElementType } from '@jaw/core';
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
export declare function createElement(type: JawElementType, props: JawProps | null, ...children: unknown[]): JawNode;
/**
 * Fragment support.
 * <></> compiles to Jaw.createElement(Jaw.Fragment, null, ...children)
 */
export declare const Fragment = "Fragment";
//# sourceMappingURL=createElement.d.ts.map