import * as React from 'react';
import Checkbox, {
  CheckboxGroup,
} from '@gio-design/components/es/components/checkbox';
import '@gio-design/components/es/components/checkbox/style/css.js';

const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' },
];

export default () => {
  const [state, updateState] = React.useState(['Apple']);
  const handleChange = (value: string[]) => {
    updateState(value);
  };
  const defaultValue = ['Apple', 'Orange'];
  return (
    <>
      <Checkbox
        checked={state.length > 0}
        indeterminate={state.length < 3 && state.length > 0}
      >
        All Selected
      </Checkbox>
      <CheckboxGroup
        defaultValue={defaultValue}
        value={state}
        onChange={handleChange}
      >
        <Checkbox value="Apple">Apple</Checkbox>
        <Checkbox value="Pear">Pear</Checkbox>
        <Checkbox value="Orange">Orange</Checkbox>
      </CheckboxGroup>
    </>
  );
};
