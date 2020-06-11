import * as React from 'react';
import { Checkbox } from '@gio-design/components';
import '@gio-design/components/es/components/checkbox/style/css.js';

export default () => {
  const [checked, update] = React.useState(false);
  const handleChange = (e: any) => {
    console.log(e.target.checked);
    update(e.target.checked);
  };
  return (
    <>
      <Checkbox checked={checked} onChange={handleChange}>
        Normal
      </Checkbox>
      <br />
      <Checkbox indeterminate checked>
        Part Checked
      </Checkbox>
      <br />
      <Checkbox checked>Checked</Checkbox>
      <br />
      <Checkbox disabled onChange={handleChange}>
        Disabled
      </Checkbox>
      <br />
      <Checkbox disabled checked>
        Disabled And Checked
      </Checkbox>
      <br />
    </>
  );
};
