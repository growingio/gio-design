import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { PlusOutlined } from '@gio-design/icons';
import { LinkProps } from '../interface';
import Link from '../Link';
import '../style';
import Docs from './LinkPage';
import { Button } from '../..';

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
          <Link data-testid="growingio" prefix={<PlusOutlined />} {...args}>
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
  href: '//www.growingio.com',
  style: {
    margin: '4px 8px',
  },
};
const LinkTemplate: Story<LinkProps> = (args) => <Link {...args}>GrowingIO</Link>;

export const Default = LinkTemplate.bind({});
Default.args = {
  href: '//www.growingio.com',
};

export const Disable = LinkTemplate.bind({});
Disable.args = {
  href: '//www.growingio.com',
  disabled: true,
};

export const Loading = LinkTemplate.bind({});
Loading.args = {
  href: '//www.growingio.com',
  loading: true,
};

export const IconLink = LinkTemplate.bind({});
IconLink.args = {
  href: '//www.growingio.com',
  prefix: <PlusOutlined />,
};

export const CustomRootNode = () => (
  <>
    <h4>支持渲染自定义跟组件</h4>
    <p>如果您需要 Link 组件的根节点渲染特定的组件（比如 React-Router Link），可以传入 `component` prop。</p>
    <Link component={Button} size="normal" href="https://growingio.com" type="text" style={{ marginRight: '2rem' }}>
      Button
    </Link>

    <Link component="span" href="https://growingio.com">
      span tag
    </Link>
  </>
);
