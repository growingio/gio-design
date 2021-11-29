import * as React from 'react';
import { CloseOutlined } from '@gio-design/icons';
import Modal from './Modal';
import { ConfirmModalProps } from './interface';

const ConfirmModal = (props: ConfirmModalProps) => {
  const { close, content, onOk } = props;

  const handleOk = () => {
    onOk?.();
    close({ triggerCancel: true });
  };

  return (
    <Modal {...props} onOk={handleOk} onClose={() => close({ triggerCancel: true })} closeIcon={<CloseOutlined />}>
      {content}
    </Modal>
  );
};

export default ConfirmModal;
