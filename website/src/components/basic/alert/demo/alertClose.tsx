import * as React from 'react';
import Alert from '@gio-design/components/es/components/alert';
import '@gio-design/components/es/components/alert/style/index.less';

export default () => {
  const close = () => {
    console.log('I was closed');
  };
  return (
    <div className="gio-alert-demo">
      <Alert
        message="Info Text"
        description="Info Description Info Description Info Description Info Description"
        closeable
        onClose={close}
      />
      <Alert
        type="success"
        message="Success Text"
        description="Success Description Success Description Success Description"
        closeable
        onClose={close}
      />
      <Alert
        type="warning"
        message="Warning Text"
        description="Warning Description Warning Description Warning Description"
        closeable
        onClose={close}
      />
      <Alert
        type="error"
        message="Error Text"
        description="Error Description Error Description Error Description"
        closeable
        onClose={close}
      />
      <Alert
        message="Info Text"
        description="Info Description Info Description Info Description Info Description"
        closeable
        onClose={close}
        size="small"
      />
      <Alert
        type="success"
        message="Success Text"
        description="Success Description Success Description Success Description"
        closeable
        onClose={close}
        size="small"
      />
      <Alert
        type="warning"
        message="Warning Text"
        description="Warning Description Warning Description Warning Description"
        closeable
        onClose={close}
        size="small"
      />
      <Alert
        type="error"
        message="Error Text"
        description="Error Description Error Description Error Description"
        closeable
        onClose={close}
        size="small"
      />
    </div>
  );
};
