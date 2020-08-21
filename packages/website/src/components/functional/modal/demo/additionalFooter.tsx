import React, { useState } from 'react';
import { Modal, Button } from '@gio-design/components';
import { PlusCircleFilled } from '@gio-design/icons';
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
        additionalFooter={
          <div style={{ textAlign: 'left' }}>
            <Button
              icon={<PlusCircleFilled />}
              style={{ marginLeft: 0 }}
              type="text"
              onClick={() => console.log('点击新建')}
            >
              新建
            </Button>
          </div>
        }
      >
        有额外 Footer 的 Modal
      </Modal>
    </>
  );
};
