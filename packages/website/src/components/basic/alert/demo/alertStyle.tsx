import * as React from 'react';
import Alert from '@gio-design/components/es/components/alert';
import '@gio-design/components/es/components/alert/style/index.less';

export default () => (
  <div>
    <Alert message="Info Text" />
    <Alert type="success" message="Success Text" />
    <Alert type="warning" message="Warning Text" />
    <Alert type="error" message="Error Text" />
    <Alert message="Info Text" size="small" />
    <Alert type="success" message="Success Text" size="small" />
    <Alert type="warning" message="Warning Text" size="small" />
    <Alert type="error" message="Error Text" size="small" />
  </div>
);
