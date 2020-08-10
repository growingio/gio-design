import * as React from 'react';
import Alert from '@gio-design/components/es/components/alert';
import '@gio-design/components/es/components/alert/style/index.less';

export default () => (
  <div>
    <Alert message="Info Text" showIcon />
    <Alert type="success" message="Success Text" showIcon />
    <Alert type="warning" message="Warning Text" showIcon />
    <Alert type="error" message="Error Text" showIcon />
    <Alert message="Info Text" showIcon size="small" />
    <Alert type="success" message="Success Text" showIcon size="small" />
    <Alert type="warning" message="Warning Text" showIcon size="small" />
    <Alert type="error" message="Error Text" showIcon size="small" />
  </div>
);
