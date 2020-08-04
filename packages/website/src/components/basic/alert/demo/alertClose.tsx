import * as React from 'react';
import Alert from '@gio-design/components/es/components/alert';
import '@gio-design/components/es/components/alert/style/index.less';

export default () => {
  const close = () => {
    console.log('I was closed');
  };
  return (
    <Alert
      type="error"
      message="Error Text"
      description="Error Description Error Description Error Description"
      closeable
      onClose={close}
    />
  );
};
