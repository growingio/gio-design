import * as React from 'react';
import Toggles from '@gio-design/components/es/components/toggles';
import '@gio-design/components/es/components/toggles/style/index.less';

export default () => {
  const change = (val: boolean) => {
    console.log(val);
  };
  return <Toggles onChange={change} defaultChecked />;
};
