import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { HomeFilled, AppsFilled, SettingOutlined, AppOutlined } from '@gio-design/icons';
import Docs from './Layout.mdx';
import { LayoutProps } from './interfaces';
import Layout from './index';
import Button from '../button';
import Avatar from '../avatar';
import Skeleton from '../skeleton';
import Select from '../select';
import Menu, { SubMenu, MenuItem, Divider } from '../menu';
import './style';
import './style/demo.stories.less';

export default {
  title: 'Basic Components/Layout',
  component: Layout,
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta;

const Header = () => (
  <Layout.Header justify="space-between" style={{ padding: '0 24px', borderBottom: '1px solid rgb(223 228 238)' }}>
    <Layout.Header.HeaderSection justify="space-between">
      <Button type="text" icon={<HomeFilled size="16px" />} />
      <img
        src="https://www.growingio.com/vassets/images/home_v3/gio-logo-primary.svg"
        style={{ width: 120, height: 26, marginTop: 7, marginLeft: 8 }}
        alt=""
      />
      <Layout.Header.HeaderDivider style={{ marginLeft: 16, height: 30 }} />
      <Select
        size="large"
        style={{ marginLeft: 8 }}
        options={[
          { value: '1', label: '金融行业 Demo' },
          { value: '2', label: '项目名称' },
        ]}
        defaultValue="1"
        bordered={false}
      />
    </Layout.Header.HeaderSection>
    <Layout.Header.HeaderSection justify="space-between" style={{ width: 136 }}>
      <Button type="text" icon={<AppsFilled />} />
      <Button type="text" icon={<SettingOutlined />} />
      <Avatar />
    </Layout.Header.HeaderSection>
  </Layout.Header>
);

const Template: Story<LayoutProps> = (args) => <Layout {...args} />;

export const Default = Template.bind({});

Default.args = {
  fixed: true,
  style: { height: 'calc(100vh - 16px)', border: '1px solid' },
  children: (
    <>
      <Header />
      <Layout.Content>
        <Skeleton style={{ padding: '40px 140px' }} />
        <Skeleton style={{ padding: '40px 140px' }} />
      </Layout.Content>
    </>
  ),
};

// eslint-disable-next-line react/jsx-props-no-spreading
const DemoListTemplate: Story = (args) => <div {...args} />;

const SuspendDemo = ({ suspend, fixed }: { suspend?: 'left' | 'right'; fixed: boolean }) => {
  const [selectedKey, setSelectedKey] = useState('1');
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const handleClick = (e: any) => {
    setSelectedKey(e.key);
    setCollapsed(true);
  };
  
  return (
    <Layout style={{ height: 'calc(100vh - 16px)' }} fixed={fixed}>
      <Header />
      <Layout>
        <Layout.Sider
          collapsed={collapsed}
          trigger="bottom"
          onCollapse={setCollapsed}
          suspendedPosition={suspend}
          style={{ backgroundColor: '#F7F8FC' }}
        >
          <Menu
            selectedKey={selectedKey}
            onClick={handleClick}
            inlineCollapsed={collapsed}
            mode="vertical"
            title="标题"
          >
            <MenuItem key="1" icon={<AppOutlined />}>
              功能名称
            </MenuItem>
            <MenuItem key="2" icon={<AppOutlined />}>
              功能名称
            </MenuItem>
            <SubMenu key="3" title="一级功能名称" icon={<AppOutlined />}>
              <MenuItem key="3-1">二级功能名称</MenuItem>
              <MenuItem key="3-2">二级功能名称</MenuItem>
              <MenuItem key="3-3">二级功能名称</MenuItem>
            </SubMenu>
            <MenuItem key="4" icon={<AppOutlined />}>
              功能名称
            </MenuItem>
          </Menu>
          <Divider />
          <Menu
            selectedKey={selectedKey}
            onClick={handleClick}
            inlineCollapsed={collapsed}
            mode="vertical"
            title="标题"
          >
            <MenuItem key="5" icon={<AppOutlined />}>
              功能名称
            </MenuItem>
            <MenuItem key="6" icon={<AppOutlined />}>
              功能名称
            </MenuItem>
            <MenuItem key="7" icon={<AppOutlined />}>
              功能名称
            </MenuItem>
            <SubMenu key="8" title="功能名称" icon={<AppOutlined />}>
              <MenuItem key="8-1">功能名称</MenuItem>
              <MenuItem key="8-2">功能名称</MenuItem>
            </SubMenu>
          </Menu>
          <Divider />
          <Menu
            selectedKey={selectedKey}
            onClick={handleClick}
            inlineCollapsed={collapsed}
            mode="vertical"
            title="标题"
          >
            <MenuItem key="9" icon={<AppOutlined />}>
              功能名称
            </MenuItem>
            <MenuItem key="10" icon={<AppOutlined />}>
              功能名称
            </MenuItem>
            <MenuItem key="11" icon={<AppOutlined />}>
              功能名称
            </MenuItem>
          </Menu>
        </Layout.Sider>
        <Layout.Content>
          <Skeleton style={{ padding: '40px 140px' }} />
          <Skeleton style={{ padding: '40px 140px' }} />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export const Sider = DemoListTemplate.bind({});

Sider.args = {
  children: <SuspendDemo fixed />,
  style: { border: '1px solid' },
};

export const Suspend = DemoListTemplate.bind({});

Suspend.args = {
  children: <SuspendDemo suspend="left" fixed />,
  style: { border: '1px solid' },
};
