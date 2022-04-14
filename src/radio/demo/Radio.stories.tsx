import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import { withDesign } from 'storybook-addon-designs';
import Radio from '../index';
import { IRadioProps, IRadioGroupProps } from '../interface';
import Docs from './RadioPage';
import '../style';

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

const radioStyle = {
  //   width: '200px',
};

const DemoTemplate = () => (
  <>
    <table style={{ marginBottom: 50 }} className="table-demo">
      <tr>
        <th>Radio</th>
        <th>Example</th>
      </tr>
      <tr>
        <td>normal</td>
        <td>
          <Radio>Normal</Radio>
        </td>
      </tr>
      <tr>
        <td>Selected</td>
        <td>
          <Radio checked>Selected</Radio>
        </td>
      </tr>
      <tr>
        <td>disable-normal</td>
        <td>
          <Radio disabled>disable-normal</Radio>
        </td>
      </tr>
      <tr>
        <td>disabled-selected</td>
        <td>
          <Radio checked disabled>
            disabled-selected
          </Radio>
        </td>
      </tr>
    </table>
    <table className="table-demo">
      <tr>
        <th>Checkbox.Group</th>
        <th>layout</th>
      </tr>
      <tr>
        <td>vertical</td>
        <td>
          <Radio.Group
            layout="vertical"
            value={2}
            options={[
              { label: '我已阅读以下条款一', value: 1 },
              { label: '我已阅读以下条款二', value: 2 },
              { label: '我已阅读以下条款三', value: 3, disabled: true },
            ]}
          />
        </td>
      </tr>
      <tr>
        <td>horizontal</td>
        <td>
          <Radio.Group
            layout="horizontal"
            value={2}
            options={[
              { label: '我已阅读以下条款一', value: 1 },
              { label: '我已阅读以下条款二', value: 2 },
              { label: '我已阅读以下条款三', value: 3, disabled: true },
            ]}
          />
        </td>
      </tr>
    </table>
  </>
);
export const Demo = DemoTemplate.bind({});
const Template: Story<IRadioProps> = (args) => {
  const [state, setstate] = useState(false);
  return (
    <div>
      <Radio
        style={radioStyle}
        {...args}
        checked={state}
        onChange={() => {
          setstate(!state);
          action('selected');
        }}
      >
        Normal
      </Radio>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  checked: false,
};

const DisabledTemplate: Story<IRadioProps> = (args) => (
  <div>
    <Radio style={radioStyle} {...args} disabled>
      Disabled-Normal
    </Radio>
    <Radio style={radioStyle} {...args} checked disabled>
      Disabled-Selected
    </Radio>
  </div>
);
export const Disable = DisabledTemplate.bind({});

Default.args = {
  disabled: false,
  checked: false,
};
const TemplateGroup: Story<IRadioGroupProps> = (args) => (
  <>
    <Radio.Group {...args} />
  </>
);

export const Group = TemplateGroup.bind({});
Group.args = {
  disabled: false,
  layout: 'horizontal',
  defaultValue: 'inOptionA',
  onChange: action('onChange'),
  options: [
    {
      label: 'inOptionA',
      value: 'inOptionA',
    },
    {
      label: 'inOptionB',
      value: 'inOptionB',
    },
    {
      label: 'inOptionDisabled',
      value: 'inOptionDisabled',
      disabled: true,
    },
  ],
} as Partial<IRadioGroupProps>;

const JSXTemplateGroup: Story<IRadioGroupProps> = (args) => {
  const tabs = [
    { key: 'key1', value: 'value1' },
    { key: 'key2', value: 'value2' },
  ];
  const [selectedValue, setSelectedValue] = React.useState('value1');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(e.target.value);
  };
  return (
    <>
      <Radio.Group {...args} value={selectedValue} onChange={onChange}>
        {tabs.map((t) => (
          <Radio value={t.value}>{t.value}</Radio>
        ))}
      </Radio.Group>
    </>
  );
};

export const JSX = JSXTemplateGroup.bind({});
