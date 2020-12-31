import React from 'react';
import Checkbox, { CheckboxGroup } from '@gio-design/components/es/components/checkbox';
import '@gio-design/components/es/components/checkbox/style/css.js';

const options = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
];

export default () => {
  const [state, updateState] = React.useState([1]);
  const handleChange = (args: any) => {
    console.log(args);
  };
  return <CheckboxGroup defaultValue={[1]} options={options} onChange={handleChange} />;
};
