import React, { useState } from 'react';
import { Modal, Button } from '@gio-design/components';
import '@gio-design/components/es/components/modal/style/index.css';

export default () => {
  const [visible, setVisible] = useState(false);
  const [pending, setPending] = useState(false);

  return (
    <>
      <Button onClick={() => setVisible(true)}>Open Modal</Button>
      <Modal
        pending={pending}
        visible={visible}
        title="title"
        closeAfterOk
        onClose={() => {
          console.log('close');
          setVisible(false);
        }}
        onOk={() => {
          console.log('ok start');
          setPending(true);
          // eslint-disable-next-line no-new
          return new Promise((resolve) => {
            console.log('ok pending');
            setTimeout(() => {
              setPending(false);
              console.log('ok resolve');
              resolve();
            }, 2000);
          });
        }}
        afterClose={() => {
          console.log('after close');
        }}
      >
        异步 confirm loading 的 Modal
      </Modal>
    </>
  );
};
