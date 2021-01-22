import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Docs from './Layout.mdx';
import { LayoutProps } from './interfaces';
import Layout from './index';
import Button from '../button';
import './style';

export default {
  title: 'Basic Components/Layout',
  component: Layout,
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta;

const Template: Story<LayoutProps> = (args) => <Layout {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: (
    <>
      <Layout.Header style={{ backgroundColor: '#5F87FF' }} />
      <Layout.Content style={{ backgroundColor: '#1248E9', height: 400 }} />
    </>
  ),
};

export const Sider = Template.bind({});

Sider.args = {
  children: (
    <>
      <Layout.Sider defaultCollapsed style={{ backgroundColor: '#3867F4' }} />
      <Layout>
        <Layout.Header style={{ backgroundColor: '#5F87FF' }} />
        <Layout.Content style={{ backgroundColor: '#1248E9', height: 400 }} />
      </Layout>
    </>
  ),
};

// eslint-disable-next-line react/jsx-props-no-spreading
const DemoListTemplate: Story = (args) => <div {...args} />;

export const Suspend = DemoListTemplate.bind({});

const SuspendDemo = ({ suspend }: { suspend?: 'left' | 'right' }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  return (
    <Layout>
      <Layout.Sider collapsed={collapsed} suspendedPosition={suspend} style={{ backgroundColor: '#3867F4' }}>
        <Button onClick={() => setCollapsed(!collapsed)} type="secondary">
          点我
        </Button>
      </Layout.Sider>
      <Layout>
        <Layout.Header style={{ backgroundColor: '#5F87FF' }} />
        <Layout.Content style={{ backgroundColor: '#1248E9', height: 400 }} />
      </Layout>
    </Layout>
  );
};

Suspend.args = {
  children: <SuspendDemo suspend="left" />,
};

export const Embed = DemoListTemplate.bind({});

Embed.args = {
  children: <SuspendDemo />,
};
