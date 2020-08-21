import React, { useState } from 'react';
import { Modal, Button, Radio, RadioGroup, TModalSize } from '@gio-design/components';
import '@gio-design/components/es/components/modal/style/index.css';

const content = Array(100).fill('content');

export default () => {
  const [size, setSize] = useState<TModalSize>('small');
  const [visible, setVisible] = useState(false);

  const handleChange = (e: any) => setSize(e.target.value);

  return (
    <>
      <div style={{ marginBottom: 10 }}>
        <RadioGroup value={size} onChange={handleChange}>
          <Radio value="small">small</Radio>
          <Radio value="middle">middle</Radio>
          <Radio value="full">full</Radio>
        </RadioGroup>
      </div>
      <Button onClick={() => setVisible(true)}>Open Modal</Button>
      <Modal
        size={size}
        visible={visible}
        title={`${size} Modal`}
        onClose={() => {
          console.log('close');
          setVisible(false);
        }}
        onOk={() => console.log('ok')}
        afterClose={() => {
          console.log('after close');
        }}
      >
        {content.map((_, index) => (
          <div key={index} style={{ marginBottom: 5 }}>
            {_}
          </div>
        ))}
      </Modal>
    </>
  );
};
