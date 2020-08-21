import React, { useState } from 'react';
import { Modal, Button } from '@gio-design/components';
import '@gio-design/components/es/components/modal/style/index.css';

export default () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button onClick={() => setVisible(true)}>Open Modal</Button>
      <Modal
        visible={visible}
        title="title"
        onClose={() => {
          console.log('close');
          setVisible(false);
        }}
        onOk={() => console.log('ok')}
        afterClose={() => {
          console.log('after close');
        }}
      >
        Default Modal
      </Modal>
    </>
  );
};
