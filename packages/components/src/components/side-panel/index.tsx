import React, { CSSProperties } from 'react';
import Modal from '../modal';

interface SidePanelProps {
  children?: Element;
  content: React.ReactNode;
  visible: boolean;
  width?: number;
  height?: number;
  style?: CSSProperties;
  close: () => void;
  getContainer?: () => HTMLElement;
  footer?: React.ReactNode;
  onOk?: () => void;
  onCancel?: () => void;
}

const SidePanel = (props: SidePanelProps) => (
  <Modal
    title='SidePanel'
    visible={props.visible}
    transitionName='rightIn'
    footer={props.footer}
    closable={false}
    maskTransitionName='fade'
    mask={false}
    width={props.width}
    height={props.height}
    style={props.style}
    wrapClassName='gio-side-panel-wrapper'
    className='gio-side-panel'
    getContainer={props.getContainer}
    onOk={props.onOk}
    onCancel={props.onCancel}
  >
    <div>
      <span className='btn-close' onClick={() => props.close()}>
        X
      </span>
      {props.content}
    </div>
  </Modal>
);
export default SidePanel;
