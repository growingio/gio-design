import * as React from 'react';
import Switch from '@gio-design/components/es/components/switch';
import '@gio-design/components/es/components/switch/style/index.less';

export default () => {
  const status = {
    a: true,
  };
  const change = (val: any) => {
    console.log('change-test', val);
    console.log('fhsihfisd', status);
  };
  return <Switch onChange={change} checked={status.a} />;
};
