import React, { useRef } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Select, { SelectProps } from './index';
import './style';

export default {
  title: 'Components/Functional/Select',
  component: Select,
  subcomponents: {
    Group: Select.Group,
    Option: Select.Option,
  },
} as Meta;

const fruitValue = ['apple', 'orange', 'greengage', 'Hami melon', 'cherry', 'chestnut', 'Chinese gooseberry'];
const fruitLabel = ['苹果', '香蕉', '青梅', '哈密瓜', '樱桃', '栗子', '猕猴桃'];

const fruitOptions = new Array(4).fill(0).reduce((prev,value,index) => {
  return [...prev,{
    value:`${fruitValue[index % 7]}${index}`,
    label: `${fruitLabel[index % 7]}${index}`,
    // groupValue: `'platform'${index % 7}`,
    // groupLabel: `'水果'${index % 7}`,
  }]
},[])

const Template: Story<SelectProps> = (args) => {
  const ref = useRef(null);
  return <Select {...args} ref={ref} />;
};
export const simpleDefault = Template.bind({});
const simpleDefaultArgs: SelectProps = {
  multiple: true,
  useAll: true,
  useFooter:true,
  options: fruitOptions,
  style: { width: 240 },
  placeholder:'请选择',
  // defaultValue: ['apple'],
  onDropDownVisibleChange: undefined,
  onChange: (value, options) => { console.log(value, options) },
};
simpleDefault.args = simpleDefaultArgs;
