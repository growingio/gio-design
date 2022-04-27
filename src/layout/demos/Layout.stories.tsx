import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { HomeFilled, MenuOutlined, GearOutlined, CardOutlined } from '@gio-design/icons';
import Docs from './LayoutPage';
import { LayoutProps } from '../interfaces';
import Layout from '../index';
import Button from '../../button';
import Avatar from '../../avatar';
import Skeleton from '../../skeleton';
import Select from '../../select';
import Menu from '../../menu';
import '../style';
import '../style/demo.stories.less';

export default {
  title: 'Upgraded/Layout',
  component: Layout,
  subcomponents: {
    'Layout.Header': Layout.Header,
    'Layout.Content': Layout.Content,
    'Layout.Sider': Layout.Sider,
    'Layout.Header.Divider': Layout.Header.HeaderDivider,
    'Layout.Header.Section': Layout.Header.HeaderSection,
  },
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta;

const Header = () => (
  <Layout.Header justify="space-between" style={{ padding: '0 24px', borderBottom: '1px solid rgb(223 228 238)' }}>
    <Layout.Header.HeaderSection justify="space-between">
      <Button.IconButton type="text">
        <HomeFilled size="16px" />
      </Button.IconButton>
      <img
        src="https://www.growingio.com/vassets/images/home_v3/gio-logo-primary.svg"
        style={{ width: 120, height: 26, marginTop: 7, marginLeft: 8 }}
        alt=""
      />
      <Layout.Header.HeaderDivider style={{ marginLeft: 16, height: 30, marginRight: 16 }} />
      <Select
        size="normal"
        overlayStyle={{ width: 144 }}
        placeholder="请选择"
        style={{ width: 144, textAlign: 'left' }}
        allowClear
        options={[
          { value: '1', label: '金融行业 Demo' },
          { value: '2', label: '项目名称' },
          { value: '3', label: '项目名称' },
          { value: '4', label: '项目名称' },
          { value: '5', label: '项目名称' },
          { value: '6', label: '项目名称' },
        ]}
        defaultValue="1"
      />
    </Layout.Header.HeaderSection>
    <Layout.Header.HeaderSection justify="space-between" style={{ width: 136 }}>
      <Button.IconButton type="text">
        <MenuOutlined />
      </Button.IconButton>
      <Button.IconButton type="text">
        <GearOutlined />
      </Button.IconButton>
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
      <Layout.Content style={{ margin: '0 10px' }}>
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
            <Menu.MenuItem key="1" icon={<CardOutlined />}>
              功能名称
            </Menu.MenuItem>
            <Menu.MenuItem key="2" icon={<CardOutlined />}>
              功能名称
            </Menu.MenuItem>
            <Menu.SubMenu key="3" title="一级功能名称" icon={<CardOutlined />}>
              <Menu.MenuItem key="3-1">二级功能名称</Menu.MenuItem>
              <Menu.MenuItem key="3-2">二级功能名称</Menu.MenuItem>
              <Menu.MenuItem key="3-3">二级功能名称</Menu.MenuItem>
            </Menu.SubMenu>
            <Menu.MenuItem key="4" icon={<CardOutlined />}>
              功能名称
            </Menu.MenuItem>
          </Menu>
          <Menu.Divider />
          <Menu
            selectedKey={selectedKey}
            onClick={handleClick}
            inlineCollapsed={collapsed}
            mode="vertical"
            title="标题"
          >
            <Menu.MenuItem key="5" icon={<CardOutlined />}>
              功能名称
            </Menu.MenuItem>
            <Menu.MenuItem key="6" icon={<CardOutlined />}>
              功能名称
            </Menu.MenuItem>
            <Menu.MenuItem key="7" icon={<CardOutlined />}>
              功能名称
            </Menu.MenuItem>
            <Menu.SubMenu key="8" title="功能名称" icon={<CardOutlined />}>
              <Menu.MenuItem key="8-1">功能名称</Menu.MenuItem>
              <Menu.MenuItem key="8-2">功能名称</Menu.MenuItem>
            </Menu.SubMenu>
          </Menu>
          <Menu.Divider />
          <Menu
            selectedKey={selectedKey}
            onClick={handleClick}
            inlineCollapsed={collapsed}
            mode="vertical"
            title="标题"
          >
            <Menu.MenuItem key="9" icon={<CardOutlined />}>
              功能名称
            </Menu.MenuItem>
            <Menu.MenuItem key="10" icon={<CardOutlined />}>
              功能名称
            </Menu.MenuItem>
            <Menu.MenuItem key="11" icon={<CardOutlined />}>
              功能名称
            </Menu.MenuItem>
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
