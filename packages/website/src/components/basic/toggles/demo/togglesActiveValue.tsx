import * as React from 'react';
import Switch from '@gio-design/components/es/components/switch';
import '@gio-design/components/es/components/switch/style/index.less';

export default () => {
  const change = (val: any) => {
    console.log('change-test', val);
  };
  return <Switch onChange={change} activeValue='activeValue' inactiveValue='inactiveValue'/>;
};
