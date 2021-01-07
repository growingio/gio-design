import * as React from 'react';
import Toggles from '@gio-design/components/es/components/toggles';
import '@gio-design/components/es/components/toggles/style/index.less';

export default () => {
  const [checked, setChecked] = React.useState<boolean>(false)
  const change = (val: any) => {
    console.log('change-test', val);
  };
  return (
    <>
      <Toggles
        onChange={change}
        activeValue="activeValue"
        inactiveValue="inactiveValue"
      />
      <Toggles
        onChange={setChecked}
        checked={checked}
        activeValue="activeValue"
        inactiveValue="inactiveValue"
      />
    </>
  );
};
