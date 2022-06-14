import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import { withDesign } from 'storybook-addon-designs';
import Radio from '../index';
import { IRadioProps, IRadioGroupProps } from '../interface';
import Docs from './RadioPage';
import '../style';
import './demos.less';
import Divider from '../../divider';

export default {
  title: 'Upgraded/Radio',
  component: Radio,
  subcomponents: { 'Radio.Group': Radio.Group },
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=4078%3A37756',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
} as Meta;

const Template: Story<IRadioProps> = (args) => <Radio {...args}>Radio</Radio>;

export const Default = Template.bind({});
Default.args = {
  disabled: false,
};

export const Disabled = () => (
  <>
    <Radio disabled>Disabled-Normal</Radio>
    <Radio checked disabled>
      Disabled-Selected
    </Radio>
  </>
);

export const Group = () => {
  const [value, setValue] = useState<string | number>(1);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    action('radio checked')(e.target.value);
    setValue(Number(e.target.value));
  };

  return (
    <>
      <Radio.Group onChange={onChange} value={value}>
        <Radio value={1}>A</Radio>
        <Radio value={2}>B</Radio>
        <Radio value={3}>C</Radio>
        <Radio value={4}>D</Radio>
      </Radio.Group>
      <Divider />
      <Radio.Group layout="vertical" onChange={onChange} value={value}>
        <Radio value={1}>A</Radio>
        <Radio value={2}>B</Radio>
        <Radio value={3}>C</Radio>
        <Radio value={4}>D</Radio>
      </Radio.Group>
    </>
  );
};

export const Options: Story<IRadioGroupProps> = () => {
  const opts = [
    { label: 'Option1', value: 'value1' },
    { label: 'Option2', value: 'value2' },
  ];
  const [selectedValue, setSelectedValue] = React.useState('value1');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(e.target.value);
    action('radio changed')(e.target.value);
  };
  return (
    <>
      <Radio.Group options={opts} value={selectedValue} onChange={onChange} />
    </>
  );
};
