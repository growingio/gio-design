import * as React from 'react';
import '@gio-design/components/es/components/toggles/style/index.less';
import Toggles from '@gio-design/components/es/components/toggles';

export default () => {
  return (
    <div>
      <Toggles disabled />
      <br />
      <Toggles disabled defaultChecked />
    </div>
  );
};
