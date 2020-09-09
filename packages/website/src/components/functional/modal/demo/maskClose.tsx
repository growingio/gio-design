/**
 * title: 点击 mask 关闭 Modal
 * desc: 没有任何 Footer 的时候, 点击 mask 可关闭 Modal。<br/>另外当手动设置 prop `footer` 为 `false | null | undefined` 时也能达到不显示 footer 的效果。
 */

import React, { useState } from 'react';
import { Modal, Button } from '@gio-design/components';
import '@gio-design/components/es/components/modal/style/index.css';

export default () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button onClick={() => setVisible(true)}>Open Modal</Button>
      <Modal
        dropCloseButton
        visible={visible}
        title="title"
        onClose={() => {
          console.log('close');
          setVisible(false);
        }}
        afterClose={() => {
          console.log('after close');
        }}
      >
        Default Modal
      </Modal>
    </>
  );
};
