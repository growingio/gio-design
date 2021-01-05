import React from 'react';
import { Modal, Button } from '@gio-design/components';
import '@gio-design/components/es/components/modal/style/index.css';

const buttonStyle = {
  marginRight: 10,
};

export default () => {
  const handleConfirm = () => {
    Modal.confirm({
      title: 'Confirm',
      content: 'Confirm Content',
      afterClose: () => {
        console.log('afterClose');
      },
    });
  };

  const handleOkPromise = () => {
    Modal.confirm({
      title: 'Ok Promise',
      content: 'onOk returns a Promise.',
      onOk: () =>
        new Promise((resolve) => {
          console.log('onOk');
          setTimeout(() => {
            console.log('ok resolved');
            resolve();
          }, 2000);
        }),
      afterClose: () => {
        console.log('afterClose');
      },
    });
  };

  const handleClosePromise = () => {
    Modal.confirm({
      title: 'Close Promise',
      content: 'onClose returns a Promise',
      onClose: () =>
        new Promise((resolve) => {
          console.log('onClose');
          setTimeout(() => {
            console.log('close resolved');
            resolve();
          }, 2000);
        }),
      afterClose: () => {
        console.log('afterClose');
      },
    });
  };

  return (
    <>
      <Button type="secondary" style={buttonStyle} onClick={() => handleConfirm()}>
        Confirm
      </Button>
      <Button type="secondary" style={buttonStyle} onClick={() => handleOkPromise()}>
        Ok Promise
      </Button>
      <Button type="secondary" style={buttonStyle} onClick={() => handleClosePromise()}>
        Close Promise
      </Button>
    </>
  );
};
