import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import { PlusOutlined } from '@gio-design/icons';
import { LinkProps } from '../interface';
import Link from '../Link';
import '../style';
import Docs from './LinkPage';

export default {
  title: 'Upgraded/Link',
  component: Link,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/J2wZWEocPEb1DbDEj99AgD/Design-System?node-id=21%3A10988',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
  decorators: [withDesign],
  argTypes: {
    prefix: {
      control: { type: 'text' }, // 不约束react_node会传入对象导致报错
    },
  },
} as Meta;

const Template: Story<LinkProps> = (args) => (
  <>
    <table className="table-demo">
      <tr>
        <th>Control</th>
        <th>描述</th>
        <th>Example</th>
      </tr>
      <tr>
        <td>Prefix </td>
        <td>文案右侧是否有icon</td>
        <td>
          <Link prefix={<PlusOutlined />} {...args}>
            GrowingIO
          </Link>
          <Link {...args}>GrowingIO</Link>
        </td>
      </tr>
      <tr>
        <td>Disabled</td>
        <td>disabled状态的样式</td>
        <td>
          <Link disabled prefix={<PlusOutlined />} {...args}>
            GrowingIO
          </Link>
          <Link disabled {...args}>
            GrowingIO
          </Link>
        </td>
      </tr>
      <tr>
        <td>Loading</td>
        <td>Loading状态的样式</td>
        <td>
          <Link loading prefix={<PlusOutlined />} {...args}>
            GrowingIO
          </Link>
          <Link loading {...args}>
            GrowingIO
          </Link>
        </td>
      </tr>
    </table>
  </>
);
export const Demo = Template.bind({});
Demo.args = {
  href: '',
  style: {
    margin: '4px 8px',
  },
};
const LinkTemplate: Story<LinkProps> = (args) => <Link {...args}>GrowingIO</Link>;

export const Default = LinkTemplate.bind({});
Default.args = {
  href: '',
};

export const Disable = LinkTemplate.bind({});
Disable.args = {
  href: '',
  disabled: true,
};

export const Loading = LinkTemplate.bind({});
Loading.args = {
  href: '',
  loading: true,
};

export const IconLink = LinkTemplate.bind({});
IconLink.args = {
  href: '',
  prefix: <PlusOutlined />,
};
