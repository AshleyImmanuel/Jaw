import type { JawNode, JawStyle } from '@jaw/core';
export interface ModalProps {
    visible: boolean;
    onClose?: () => void;
    children?: JawNode | JawNode[];
    style?: JawStyle;
    testId?: string;
}
/**
 * A polished dialog overlay with backdrop blurring.
 * Mounts globally via Stack relative positioning.
 */
export declare function Modal(props: ModalProps): JawNode;
//# sourceMappingURL=Modal.d.ts.map