/* eslint-disable no-console */
import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Checkbox, { CheckboxGroup } from '../index';
import { CheckboxProps } from '../interface';
import '../style';
import Docs from './CheckboxPage';
import './demos.less';

export default {
  title: 'Upgraded/Checkbox',
  component: Checkbox,
  subcomponents: { 'Checkbox.Group': CheckboxGroup },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Design?node-id=4078%3A37260',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
} as Meta;

const DefaultTemplate: Story<CheckboxProps> = (args) => <Checkbox {...args} />;
export const Default = DefaultTemplate.bind({});
Default.args = {
  children: 'Apple',
  'aria-label': 'Apple',
  defaultChecked: false,
  indeterminate: false,
  disabled: false,
};
// Indeterminate
export const Indeterminate = DefaultTemplate.bind({});
Indeterminate.args = {
  children: 'Apple',
  indeterminate: true,
};

export const Basic = () => (
  <>
    <Checkbox aria-label="Checkbox Demo" />
    <Checkbox aria-label="Checkbox Demo" defaultChecked />
    <Checkbox aria-label="Checkbox Demo" indeterminate />
    <Checkbox aria-label="Checkbox Demo" disabled />
    <Checkbox aria-label="Checkbox Demo" disabled checked />
    <Checkbox aria-label="Checkbox Demo" disabled indeterminate />
  </>
);

export const Labels = () => (
  <>
    <Checkbox defaultChecked>Label</Checkbox>
    <br />
    <Checkbox disabled>Disabled</Checkbox>
  </>
);

export const Color = () => (
  <>
    <Checkbox defaultChecked />
    <Checkbox defaultChecked indeterminate color="pink" />
    <Checkbox defaultChecked color="purple" />
    <Checkbox defaultChecked color="greenyellow" />
  </>
);

export const Controlled = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <Checkbox checked={checked} onChange={handleChange}>
      Controlled Checkbox
    </Checkbox>
  );
};

export const Group = () => (
  <>
    <Checkbox.Group
      defaultValue={['value2']}
      options={[
        { label: 'Checkbox 1', value: 'value1' },
        { label: 'Checkbox 2', value: 'value2' },
        { label: 'Checkbox 3', value: 'value3', disabled: true },
        { label: 'Checkbox 4', value: 'value4', onChange: (event: { target: { checked?: boolean; }; }) => console.log(event.target.checked) },
      ]}
    />
    <hr />
    <Checkbox.Group
      layout="vertical"
      defaultValue={['value2', 'value3']}
    >
      <Checkbox value="value1">Checkbox 1</Checkbox>
      <Checkbox value="value2">Checkbox 2</Checkbox>
      <Checkbox value="value3" disabled>Checkbox 3</Checkbox>
      <Checkbox value="value4" indeterminate disabled>Checkbox 4</Checkbox>
    </Checkbox.Group>
  </>
);
