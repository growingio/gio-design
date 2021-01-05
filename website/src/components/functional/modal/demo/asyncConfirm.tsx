/**
 * title: pending 状态的 Modal
 * desc: 设置 pending props，Modal 会进入 pending 状态，确认和关闭将不可用。<br/>需要注意的是，如果同时设置的 closeAfterOk，那么 onOk 需要返回一个 Promise，否则 onClose 会立即执行
 */
import React, { useState } from 'react';
import { Modal, Button } from '@gio-design/components';
import '@gio-design/components/es/components/modal/style/index.css';

export default () => {
  const [visible, setVisible] = useState(false);
  const [visibleReject, setVisibleReject] = useState(false);
  const [pending, setPending] = useState(false);

  return (
    <>
      <Button onClick={() => setVisible(true)}>onOk Resolve</Button>
      <Button type="secondary" onClick={() => setVisibleReject(true)} style={{ marginLeft: 10 }}>
        onOk Reject
      </Button>
      <Modal
        pending={pending}
        visible={visible}
        title="Resolve"
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
        点击确定按钮两秒后 resolve，Modal 将自动关闭
      </Modal>
      <Modal
        pending={pending}
        visible={visibleReject}
        title="Reject"
        closeAfterOk
        onClose={() => {
          console.log('close');
          setVisibleReject(false);
        }}
        onOk={() => {
          console.log('ok start');
          setPending(true);
          // eslint-disable-next-line no-new
          return new Promise((resolve, reject) => {
            console.log('ok pending');
            setTimeout(() => {
              setPending(false);
              console.log('ok reject');
              reject();
            }, 2000);
          });
        }}
        afterClose={() => {
          console.log('after close');
        }}
      >
        点击确定按钮两秒后 reject，Modal 将不会关闭。
      </Modal>
    </>
  );
};
