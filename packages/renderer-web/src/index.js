/**
 * @jaw/renderer-web
 *
 * The Jaw Web Renderer. Takes a JawNode tree, computes layout,
 * and renders to the DOM with minimal mutations.
 *
 * This is the main entry point for rendering Jaw apps in the browser.
 */
import { computeLayout } from '@jaw/layout';
import { mountDOM, updateDOM } from './dom';
export { createDOMTree, mountDOM, updateDOM } from './dom';
export { layoutBoxToCSS } from './styles';
export { bindEvents } from './events';
export { diffTrees } from './diff';
export { applyPatches } from './patch';
/**
 * The Web Renderer.
 *
 * Implements the Renderer interface for the browser (DOM + CSS).
 */
export class WebRenderer {
    name = 'web';
    container = null;
    currentTree = null;
    eventCallback = null;
    config;
    constructor(config = {}) {
        this.config = config;
    }
    /**
     * Mount a layout tree into a DOM container.
     */
    mount(tree, container) {
        this.container = container;
        this.currentTree = tree;
        mountDOM(tree, this.container);
    }
    /**
     * Update the rendered DOM with a new layout tree.
     */
    update(oldTree, newTree) {
        if (!this.container)
            return;
        this.currentTree = newTree;
        updateDOM(oldTree, newTree, this.container);
    }
    /**
     * Unmount and clean up.
     */
    unmount() {
        if (this.container) {
            this.container.innerHTML = '';
        }
        this.currentTree = null;
        this.container = null;
    }
    /**
     * Register event callback for renderer-to-runtime communication.
     */
    onEvent(callback) {
        this.eventCallback = callback;
    }
}
/**
 * Render a Jaw app to the DOM.
 *
 * This is the high-level API that most developers will use.
 * It handles the full pipeline: tree -> layout -> DOM.
 *
 * @param rootNode - The root JawNode of the app
 * @param container - The DOM element to render into
 * @param width - Container width (defaults to container's clientWidth)
 * @param height - Container height (defaults to container's clientHeight)
 * @returns A re-render function that can be called with a new tree
 */
export function render(rootNode, container, width, height) {
    let currentRootNode = rootNode;
    let currentLayout = null;
    // Create a reusable off-screen canvas for fast, synchronous text measurement
    const measurementCanvas = document.createElement('canvas');
    const measurementContext = measurementCanvas.getContext('2d');
    const measureText = (ctx) => {
        if (!measurementContext)
            return { width: 0, height: 0 };
        // Construct font string (e.g. "bold 16px sans-serif")
        const weight = ctx.fontWeight ?? 'normal';
        const size = typeof ctx.fontSize === 'number' ? `${ctx.fontSize}px` : (ctx.fontSize ?? '16px');
        const family = ctx.fontFamily ?? 'sans-serif';
        measurementContext.font = `${weight} ${size} ${family}`;
        // Measure text
        const metrics = measurementContext.measureText(ctx.content);
        // Approximate height if fontBoundingBoxAscent is not available in all browsers
        const height = (metrics.fontBoundingBoxAscent || parseInt(size)) +
            (metrics.fontBoundingBoxDescent || 0);
        return {
            width: metrics.width,
            // Add a tiny bit of buffer for lineHeight
            height: height * 1.2
        };
    };
    const doRender = () => {
        const w = width ?? (container.clientWidth || window.innerWidth);
        const h = height ?? (container.clientHeight || window.innerHeight);
        const newLayout = computeLayout(currentRootNode, w, h, measureText);
        updateDOM(currentLayout, newLayout, container);
        currentLayout = newLayout;
    };
    // Initial render
    const initialW = width ?? (container.clientWidth || window.innerWidth);
    const initialH = height ?? (container.clientHeight || window.innerHeight);
    currentLayout = computeLayout(currentRootNode, initialW, initialH, measureText);
    mountDOM(currentLayout, container);
    // Attach resize listener
    window.addEventListener('resize', () => {
        doRender();
    });
    // Return re-render function
    return (newNode) => {
        currentRootNode = newNode;
        doRender();
    };
}
//# sourceMappingURL=index.js.map