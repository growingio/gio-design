import * as React from 'react';
import Toggles from '@gio-design/components/es/components/toggles';
import '@gio-design/components/es/components/toggles/style/index.less';
import { check } from 'prettier';

export default () => {
  const [checked, setChecked] = React.useState<boolean>(false)
  const change = (val: boolean) => {
    console.log('change-test', val);
  };
  const togglesChange = (v: boolean) => {
    setChecked(v)
  }
  return (
    <>
      <Toggles
        onChange={change}
        activeValue="activeValue"
        inactiveValue="inactiveValue"
      />
      <br />
      <Toggles
        onChange={togglesChange}
        checked={checked}
        activeValue="activeValue"
        inactiveValue="inactiveValue"
      />
    </>
  );
};
