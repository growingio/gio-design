/**
 * title: 不同 size 的 Modal
 * desc: Modal 分为 small, middle, full 三种形态。<br/>当屏幕宽度小于820px时，small弹窗变为full弹窗。<br/>当屏幕宽度小于1200px 时，middle弹窗变为 full弹窗。<br/>small和middle尺寸的 Modal 在视口高度足够时，最大高度为 600px。<br/>当视口高度不足时，会固定上下距离各100px，内容超出body高度时 body进行滚动。但最终有content 有一个最小高度 190px。
 */

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
