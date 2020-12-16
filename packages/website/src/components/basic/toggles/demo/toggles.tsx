import * as React from 'react';
import Toggles from '@gio-design/components/es/components/toggles';
import '@gio-design/components/es/components/toggles/style/index.less';

export default () => {
  const status = {
    a: true,
  };
  const change = (val: any) => {
    console.log('change-test', val);
    console.log('fhsihfisd', status);
  };
  return <Toggles onChange={change} defaultChecked={status.a} />;
};
