import * as React from 'react';
import Switch from '@gio-design/components/es/components/switch';
import '@gio-design/components/es/components/switch/style/index.less';

export default () => {
  return (
    <div>
      <Switch disabled />
      <br />
      <Switch disabled checked />
    </div>
  );
};
