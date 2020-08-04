import * as React from 'react';
import Alert from '@gio-design/components/es/components/alert';
import '@gio-design/components/es/components/alert/style/index.less';

export default () => {
  return (
    <Alert
      type="success"
      message="Success Text"
      closeable
      colseText="Close Now"
    />
  );
};
