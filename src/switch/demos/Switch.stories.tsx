import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import { GameOutlined } from '@gio-design/icons';
import Switch from '../index';
import { SwitchProps } from '../interface';
import Docs from './SwitchPage';
import '../style';

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

export const Default = () => (
  <Switch>
    <Switch.Item value="OptionA" key="1">
      OptionA
    </Switch.Item>
    <Switch.Item value="OptionB" key="2">
      OptionB
    </Switch.Item>
  </Switch>
);
export const Options = () => (
  <Switch
    options={[
      {
        label: 'OptionA',
        value: 'OptionA',
      },
      {
        label: 'OptionB',
        value: 'OptionB',
      },
    ]}
  />
);
export const Disabled = () => (
  <Switch disabled defaultValue="OptionA">
    <Switch.Item value="OptionA" key="1">
      OptionA
    </Switch.Item>
    <Switch.Item value="OptionB" key="2">
      OptionB
    </Switch.Item>
  </Switch>
);

export const Size = () => (
  <>
    <Switch defaultValue="OptionA">
      <Switch.Item value="OptionA" key="1">
        OptionA
      </Switch.Item>
      <Switch.Item value="OptionB" key="2">
        OptionB
      </Switch.Item>
    </Switch>
    <Switch defaultValue="OptionA" size="small">
      <Switch.Item value="OptionA" key="1">
        OptionA
      </Switch.Item>
      <Switch.Item value="OptionB" key="2">
        OptionB
      </Switch.Item>
    </Switch>
  </>
);

export const DefaultValue = () => (
  <Switch defaultValue="OptionA">
    <Switch.Item value="OptionA" key="1">
      OptionA
    </Switch.Item>
    <Switch.Item value="OptionB" key="2">
      OptionB
    </Switch.Item>
  </Switch>
);
export const OnChange = () => (
  <Switch
    defaultValue="OptionA"
    onChange={(e) => {
      action('e');
      console.log(e, 'e');
    }}
  >
    <Switch.Item value="OptionA" key="1">
      OptionA
    </Switch.Item>
    <Switch.Item value="OptionB" key="2">
      OptionB
    </Switch.Item>
  </Switch>
);
export const SwitchItem: Story<SwitchProps> = () => (
  <Switch>
    <Switch.Item value="OptionA" key="1">
      OptionA
    </Switch.Item>
    <Switch.Item value="OptionB" key="2">
      OptionB
    </Switch.Item>
  </Switch>
);
export const SwitchValue: Story<SwitchProps> = () => {
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
      <Switch size="normal" value={selectedValue} onChange={onChange}>
        {tabs.map((t) => (
          <Switch.Item value={t.value} key={t.key}>
            {t.value}
          </Switch.Item>
        ))}
      </Switch>
    </>
  );
};

export const ItemDefaultChecked: Story<SwitchProps> = () => (
  <Switch>
    <Switch.Item value="OptionA" key="1" defaultChecked>
      OptionA
    </Switch.Item>
    <Switch.Item value="OptionB" key="2">
      OptionB
    </Switch.Item>
  </Switch>
);

export const ItemPrefix: Story<SwitchProps> = () => (
  <Switch>
    <Switch.Item value="OptionA" key="1" prefix={<GameOutlined />}>
      OptionA
    </Switch.Item>
    <Switch.Item value="OptionB" key="2" prefix={<GameOutlined />}>
      OptionB
    </Switch.Item>
  </Switch>
);

export const ItemDisabled: Story<SwitchProps> = () => (
  <Switch>
    <Switch.Item value="OptionA" key="1" prefix={<GameOutlined />} disabled>
      OptionA
    </Switch.Item>
    <Switch.Item value="OptionB" key="2" prefix={<GameOutlined />}>
      OptionB
    </Switch.Item>
  </Switch>
);

export const ItemChecked: Story<SwitchProps> = () => (
  <Switch>
    <Switch.Item value="OptionA" key="1" checked>
      OptionA
    </Switch.Item>
    <Switch.Item value="OptionB" key="2">
      OptionB
    </Switch.Item>
  </Switch>
);
