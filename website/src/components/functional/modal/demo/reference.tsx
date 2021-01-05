/**
 * desc: 调用 Modal 的静态方法后返回一个对象引用 `modalRef`。<br/><br/> 可使用 `modalRef.destroy()` 由外部进行 Modal 的关闭。<br/><br/> 可使用 `modalRef.update(config)` 由 Modal 的更新。
 */
import React from 'react';
import { Modal, Button } from '@gio-design/components';
import '@gio-design/components/es/components/modal/style/index.css';

const buttonStyle = {
  marginRight: 10,
};

export default () => {
  const handleAutoDestroy = () => {
    const infoModal = Modal.info({
      title: 'Info',
      content: '三秒后 Modal 将自动关闭。',
    });

    setTimeout(() => {
      infoModal.destroy();
    }, 3000);
  };

  const handleUpdate = () => {
    const infoModal = Modal.info({
      title: 'Info',
      content: '三秒后 content 将改变。',
    });

    setTimeout(() => {
      infoModal.update({
        content: 'New Content!',
      });
    }, 3000);
  };

  return (
    <>
      <Button type="secondary" style={buttonStyle} onClick={() => handleAutoDestroy()}>
        Auto Destroy
      </Button>
      <Button type="secondary" style={buttonStyle} onClick={() => handleUpdate()}>
        Auto Update
      </Button>
    </>
  );
};
