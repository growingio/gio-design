import * as React from 'react';
import { CheckboxGroup,Checkbox } from '@gio-design/components';
import '@gio-design/components/es/components/radio/style/css.js';

const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' },
];


export default () => {
  const [state, updateState] = React.useState(['Apple']);
  const handleChange = (args) => {
    console.log(args)
  }
  return <>
    <CheckboxGroup defaultValue={['Apple']} options={options} onChange={handleChange} disabled />
   
    <CheckboxGroup defaultValue={['Apple']} options={options} onChange={handleChange} />
    <CheckboxGroup defaultValue={['Apple']} onChange={handleChange}>
      <Checkbox value='Apple'>Apple</Checkbox>
      <Checkbox value='Pear'>Pear</Checkbox>
      <Checkbox value='Orange'>Orange</Checkbox>
    </CheckboxGroup>
  </>
}