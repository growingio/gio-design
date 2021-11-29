import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { PlusOutlined, FilterOutlined } from '@gio-design/icons';
import { action } from '@storybook/addon-actions';
import Option from '../Option';
import { SelectProps } from '../interface';
import Select from '../Select';
import '../style';
import './style.less';
import Docs from './SelectPage';

export default {
  title: 'Upgraded/Select',
  component: Select,
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta;
const defaultLabels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

const demoTemplate: Story<SelectProps> = (props) => {
  const options = defaultLabels.reduce((prev, curr) => [...prev, { label: `第${curr}条咸鱼`, value: curr }], []);
  return (
    <>
      <div className="demo-box">
        <Select
          options={options}
          value="1"
          placeholder="请选择"
          size="normal"
          {...props}
          onVisibleChange={() => action('visibleChange')}
        />
      </div>
      <div className="demo-box">
        <Select disabled options={options} placeholder="请选择" size="normal" {...props} />
      </div>
      <h3>自定义list,trigger宽度</h3>
      <div className="demo-box">
        <Select
          options={options}
          contentStyle={{ width: 240 }}
          placeholder="请选择"
          allowClear={false}
          // triggerProps={{ placeholder: '请选择', style: { width: 240, textAlign: 'left' }, allowClear: false }}
          size="small"
          {...props}
        />
      </div>
      <h3>hide trigger Prefix</h3>
      <div className="demo-box">
        <Select
          options={options}
          contentStyle={{ width: 240 }}
          placeholder="请选择"
          allowClear={false}
          size="small"
          {...props}
        />
      </div>
      <h3>prefix,suffix(如果设置prefix、suffix trigger在有值时会render Select的prefix、suffix)</h3>
      <div className="demo-box">
        <Select
          options={options}
          prefix={() => <PlusOutlined size="14px" />}
          suffix={() => <FilterOutlined size="14px" />}
          contentStyle={{ width: 240 }}
          placeholder="请选择"
          allowClear={false}
          size="small"
          {...props}
        />
      </div>
      <h3>JSX--prefix</h3>
      <div className="demo-box">
        <Select style={{ width: '240px' }} placeholder="请选择" allowClear={false}>
          <Option label="JSX1" value="JSX1" />
          <Option label="JSX2" value="JSX2" />
        </Select>
        <Select style={{ width: '240px' }} placeholder="请选择" allowClear={false}>
          <Option value="JSX1" prefix="123">
            JSX1
          </Option>
          <Option value="JSX2">JSX2</Option>
        </Select>
      </div>
    </>
  );
};

export const Demo = demoTemplate.bind({
  triggerProps: {
    placeholder: '请选择',
  },
});

export const Default = () => {
  const options = defaultLabels.reduce((prev, curr) => [...prev, { label: `第${curr}条咸鱼`, value: curr }], []);
  return (
    <Select
      options={options}
      value="1"
      contentStyle={{ width: '300px' }}
      placeholder="请选择"
      size="normal"
      onVisibleChange={() => action('visibleChange')}
    />
  );
};
