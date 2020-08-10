import * as React from 'react';
import Alert from '@gio-design/components/es/components/alert';
import '@gio-design/components/es/components/alert/style/index.less';

export default () => (
  <div>
    <Alert description="Info Description Info Description Info Description Info Description" />
    <Alert type="success" description="Success Description Success Description Success Description" />
    <Alert
      type="warning"
      description="Warning Description Warning Description Warning Description Warning Description"
    />
    <Alert type="error" description="Error Description Error Description Error Description Error Description" />
    <Alert description="Info Description Info Description Info Description Info Description" size="small" />
    <Alert type="success" description="Success Description Success Description Success Description" size="small" />
    <Alert
      type="warning"
      description="Warning Description Warning Description Warning Description Warning Description"
      size="small"
    />
    <Alert
      type="error"
      description="Error Description Error Description Error Description Error Description"
      size="small"
    />
  </div>
);
