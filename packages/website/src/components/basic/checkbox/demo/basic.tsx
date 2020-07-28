import * as React from 'react';
import Checkbox from '@gio-design/components/es/components/checkbox';
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
      <br />
      <Checkbox indeterminate checked>
        Part Checked
      </Checkbox>
      <br />
      <br />
      <Checkbox indeterminate disabled>
        Part Checked And Disabled
      </Checkbox>
      <br />
      <br />
      <Checkbox checked>Checked</Checkbox>
      <br />
      <br />
      <Checkbox disabled onChange={handleChange}>
        Disabled
      </Checkbox>
      <br />
      <br />
      <Checkbox disabled checked>
        Disabled And Checked
      </Checkbox>
    </>
  );
};
