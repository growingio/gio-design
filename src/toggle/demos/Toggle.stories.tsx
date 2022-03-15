import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import { action } from '@storybook/addon-actions';
import Toggle from '../index';
import { ToggleProps } from '../interface';
import '../style';
import Docs from './TogglePage';

export default {
  title: 'Upgraded/Toggle',
  component: Toggle,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=4078%3A37806',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
} as Meta;

const DemoTemplate = () => (
  <table className="table-demo">
    <tr>
      <th>Toggle</th>
      <th>Example</th>
    </tr>
    <tr>
      <td>on</td>
      <td>
        <Toggle onChange={() => action('invoked')} defaultOn />
      </td>
    </tr>
    <tr>
      <td>off</td>
      <td>
        <Toggle onChange={() => action('invoked')} />
      </td>
    </tr>
    <tr>
      <td>disabled-on</td>
      <td>
        <Toggle onChange={() => action('invoked')} disabled defaultOn />
      </td>
    </tr>
    <tr>
      <td>disabled-off</td>
      <td>
        <Toggle onChange={() => action('invoked')} disabled />
      </td>
    </tr>
    <tr>
      <td>suffix</td>
      <td>
        <Toggle
          onChange={() => action('invoked')}
          checkedChildren={<span>开启</span>}
          uncheckedChildren={<span>关闭</span>}
        />
      </td>
    </tr>
  </table>
);

export const Demo = DemoTemplate.bind({});

const Template: Story<ToggleProps> = (args) => <Toggle {...args} />;
export const Default = Template.bind({});
Default.args = {
  className: 'gio-toggles-default',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const Suffix = Template.bind({});
Suffix.args = {
  checkedChildren: <span>开启</span>,
  uncheckedChildren: <span>关闭</span>,
};
