import { describe, it, expect, vi } from 'vitest';
import { serializeRenderPlan, MessageBridge } from '../src/index';
describe('Android Renderer', () => {
    it('serializes a LayoutBox tree into an AndroidRenderNode', () => {
        const mockNode = {
            __jaw: true,
            type: 'Box',
            props: { style: { width: 100 }, testId: 'my-box' },
            children: []
        };
        const mockLayout = {
            node: mockNode,
            x: 10,
            y: 20,
            width: 100,
            height: 200,
            margin: { top: 0, right: 0, bottom: 0, left: 0 },
            padding: { top: 0, right: 0, bottom: 0, left: 0 },
            border: { top: 0, right: 0, bottom: 0, left: 0 },
            children: []
        };
        const result = serializeRenderPlan(mockLayout);
        expect(result.id).toBe('root');
        expect(result.type).toBe('Box');
        expect(result.x).toBe(10);
        expect(result.y).toBe(20);
        expect(result.width).toBe(100);
        expect(result.height).toBe(200);
        expect(result.props.testId).toBe('my-box');
        expect(result.children.length).toBe(0);
    });
    it('MessageBridge handles native messages properly', () => {
        // Mock the global Android bridge
        const mockPostMessage = vi.fn();
        globalThis.__JAW_ANDROID_BRIDGE__ = {
            postMessage: mockPostMessage
        };
        const bridge = new MessageBridge();
        // Test sending
        bridge.send({ type: 'RENDER', payload: { id: 'root', type: 'Box', x: 0, y: 0, width: 100, height: 100, props: {}, children: [] } });
        expect(mockPostMessage).toHaveBeenCalledTimes(1);
        // Test receiving
        const mockListener = vi.fn();
        bridge.subscribe(mockListener);
        // Simulate Native calling the JS callback
        const nativeCallback = globalThis.__JAW_RECEIVE_FROM_NATIVE__;
        expect(nativeCallback).toBeDefined();
        nativeCallback(JSON.stringify({ type: 'EVENT', payload: { type: 'onPress', target: 'root' } }));
        expect(mockListener).toHaveBeenCalledWith({ type: 'EVENT', payload: { type: 'onPress', target: 'root' } });
    });
});
//# sourceMappingURL=renderer.test.js.map