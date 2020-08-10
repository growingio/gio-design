import * as React from 'react';
import Alert from '@gio-design/components/es/components/alert';
import '@gio-design/components/es/components/alert/style/index.less';

export default () => (
  <div>
    <Alert message="Info Text" description="Info Description Info Description Info Description Info Description" />
    <Alert
      type="success"
      message="Success Text"
      description="Success Description Success Description Success Description"
    />
    <Alert
      type="warning"
      message="Warning Text"
      description="Warning Description Warning Description Warning Description Warning Description"
    />
    <Alert
      type="error"
      message="Error Text"
      description="Error Description Error Description Error Description Error Description"
    />
    <Alert
      message="Info Text"
      description="Info Description Info Description Info Description Info Description"
      size="small"
    />
    <Alert
      type="success"
      message="Success Text"
      description="Success Description Success Description Success Description"
      size="small"
    />
    <Alert
      type="warning"
      message="Warning Text"
      description="Warning Description Warning Description Warning Description Warning Description"
      size="small"
    />
    <Alert
      type="error"
      message="Error Text"
      description="Error Description Error Description Error Description Error Description"
      size="small"
    />
  </div>
);
