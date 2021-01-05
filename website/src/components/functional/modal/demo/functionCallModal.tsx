import React from 'react';
import { Modal, Button } from '@gio-design/components';
import '@gio-design/components/es/components/modal/style/index.css';

const buttonStyle = {
  marginRight: 10,
};

export default () => {
  const handleInfo = () => {
    Modal.info({
      title: 'Info',
      content: 'Info content',
    });
  };

  const handleSuccess = () => {
    Modal.success({
      title: 'Success',
      content: 'Success content',
    });
  };

  const handleWarn = () => {
    Modal.warn({
      title: 'Warn',
      content: 'Warn content',
    });
  };

  const handleError = () => {
    Modal.error({
      title: 'Error',
      content: 'Error content',
    });
  };

  return (
    <>
      <Button type="secondary" style={buttonStyle} onClick={() => handleInfo()}>
        Info
      </Button>
      <Button type="secondary" style={buttonStyle} onClick={() => handleSuccess()}>
        Success
      </Button>
      <Button type="secondary" style={buttonStyle} onClick={() => handleWarn()}>
        Warn
      </Button>
      <Button type="secondary" style={buttonStyle} onClick={() => handleError()}>
        Error
      </Button>
    </>
  );
};
