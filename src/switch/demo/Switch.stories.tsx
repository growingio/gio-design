import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { ListOutlined, PushMsgFilled } from '@gio-design/icons';
import Switch from '../index';
import { SwitchProps } from '../interface';
import Docs from './SwitchPage';
import '../style';
import './index.less';

export default {
  title: 'Upgraded/Switch',
  component: Switch,
  subcomponents: { 'Switch.Item': Switch.Item },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=6322%3A62046',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
} as Meta;

const options = [
  {
    label: 'OptionA',
    value: 'OptionA',
  },
  {
    label: 'OptionB',
    value: 'OptionB',
  },
  {
    label: 'OptionC',
    value: 'OptionC',
  },
  {
    label: 'OptionD',
    value: 'OptionD',
  },
  {
    label: 'OptionE',
    value: 'OptionE',
  },
  {
    label: 'OptionF',
    value: 'OptionF',
  },
];
const DemoTemplate = () => (
  <table className="table-demo">
    <tr>
      <th>Switch</th>
      <th>Example</th>
    </tr>
    <tr>
      <td>size</td>
      <td>
        <Switch size="small" options={options} />
        <Switch size="normal" options={options} />
      </td>
    </tr>
    <tr>
      <td>icon</td>
      <td>
        <Switch
          size="small"
          options={[
            {
              label: <ListOutlined size="14" />,
              value: 'OptionA',
            },
            {
              label: <ListOutlined size="14" />,
              value: 'OptionB',
            },
            {
              label: <ListOutlined size="14" />,
              value: 'OptionC',
            },
            {
              label: <ListOutlined size="14" />,
              value: 'OptionD',
            },
            {
              label: <ListOutlined size="14" />,
              value: 'OptionE',
            },
            {
              label: <ListOutlined size="14" />,
              value: 'OptionF',
            },
          ]}
        />
        <Switch
          size="normal"
          options={[
            {
              label: <ListOutlined size="14" />,
              value: 'OptionA',
            },
            {
              label: <ListOutlined size="14" />,
              value: 'OptionB',
            },
            {
              label: <ListOutlined size="14" />,
              value: 'OptionCDisabled',
            },
            {
              label: <ListOutlined size="14" />,
              value: 'OptionD',
            },
            {
              label: <ListOutlined size="14" />,
              value: 'OptionE',
            },
            {
              label: <ListOutlined size="14" />,
              value: 'OptionF',
            },
          ]}
        />
      </td>
    </tr>
    <tr>
      <td>disabled</td>
      <td>
        <Switch
          size="small"
          options={[
            {
              label: 'OptionA',
              value: 'OptionA',
            },
            {
              label: 'OptionB',
              value: 'OptionB',
            },
            {
              label: 'OptionC',
              value: 'OptionC',
            },
            {
              label: 'OptionD',
              value: 'OptionD',
              disabled: true,
            },
            {
              label: 'OptionE',
              value: 'OptionE',
              disabled: true,
            },
            {
              label: 'OptionF',
              value: 'OptionF',
              disabled: true,
            },
          ]}
        />
        <Switch
          size="normal"
          options={[
            {
              label: 'OptionA',
              value: 'OptionA',
            },
            {
              label: 'OptionB',
              value: 'OptionB',
            },
            {
              label: 'OptionC',
              value: 'OptionC',
            },
            {
              label: 'OptionD',
              value: 'OptionD',
              disabled: true,
            },
            {
              label: 'OptionE',
              value: 'OptionE',
              disabled: true,
            },
            {
              label: 'OptionF',
              value: 'OptionF',
              disabled: true,
            },
          ]}
        />
      </td>
    </tr>
    <tr>
      <td>defaultValue</td>
      <td>
        <Switch size="small" defaultValue="OptionA" options={options} />
        <Switch size="normal" defaultValue="OptionA" options={options} />
      </td>
    </tr>
  </table>
);
export const Demo = DemoTemplate.bind({});
const TemplateIconGroup: Story<SwitchProps> = (args) => (
  <>
    <Switch {...args} />
  </>
);
export const IconGroup = TemplateIconGroup.bind({});
IconGroup.args = {
  disabled: false,
  defaultValue: 'OptionA',
  options: [
    {
      label: <ListOutlined />,
      value: 'OptionA',
    },
    {
      label: <ListOutlined />,
      value: 'OptionB',
    },
    {
      label: <ListOutlined />,
      value: 'OptionCDisabled',
      disabled: true,
    },
    {
      label: <ListOutlined />,
      value: 'OptionD',
    },
    {
      label: <ListOutlined />,
      value: 'OptionE',
    },
    {
      label: <ListOutlined />,
      value: 'OptionF',
    },
  ],
};

const TemplateGroup: Story<SwitchProps> = (args) => (
  <>
    <Switch {...args} />
  </>
);
export const Default = TemplateGroup.bind({});
Default.args = {
  disabled: false,
  defaultValue: 'OptionA',
  options: [
    {
      label: 'OptionA',
      value: 'OptionA',
    },
    {
      label: 'OptionB',
      value: 'OptionB',
    },
    {
      label: 'OptionC',
      value: 'OptionC',
    },
    {
      label: 'OptionD',
      value: 'OptionD',
    },
    {
      label: 'OptionE',
      value: 'OptionE',
    },
    {
      label: 'OptionF',
      value: 'OptionF',
    },
  ],
};

export const Disabled = TemplateGroup.bind({});

Disabled.args = {
  size: 'normal',
  options: [
    {
      label: 'OptionA',
      value: 'OptionA',
    },
    {
      label: 'OptionB',
      value: 'OptionB',
    },
    {
      label: 'OptionC',
      value: 'OptionC',
      disabled: true,
    },
    {
      label: 'OptionD',
      value: 'OptionD',
      disabled: true,
    },
    {
      label: 'OptionE',
      value: 'OptionE',
      disabled: true,
    },
    {
      label: 'OptionF',
      value: 'OptionF',
      disabled: true,
    },
  ],
};

const JSXTemplateGroup: Story<SwitchProps> = (args) => {
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
      <Switch {...args} size="normal" value={selectedValue} onChange={onChange}>
        {tabs.map((t) => (
          <Switch.Item value={t.value} prefix={<PushMsgFilled />}>
            {t.value}
          </Switch.Item>
        ))}
      </Switch>
    </>
  );
};

export const JSX = JSXTemplateGroup.bind({});
