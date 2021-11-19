import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import {
  DownloadOutlined,
  EmailOutlined,
  FullScreenOutlined,
  MoreOutlined,
  PlusOutlined,
  ReloadOutlined,
  SettingOutlined,
} from '@gio-design/icons';
import Docs from './DropdownPage';
import Dropdown, { DropdownProps } from '../index';
import '../style';
import Button, { IconButton } from '../../button';
import List, { Item } from '../../list';
import Divider from '../../divider';
import CascaderItem from '../../list/inner/CascaderItem';

export default {
  title: 'Upgraded/Dropdown',
  component: Dropdown,
  parameters: {
    docs: {
      page: Docs,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=6432%3A78838',
      allowFullscreen: true,
    },
  },
} as Meta;

const DemoTemplate: Story<DropdownProps> = (args) => (
  <>
    <Dropdown
      {...args}
      content={
        <List>
          <Item prefix={<ReloadOutlined />} value="1">
            刷新数据
          </Item>
          <Item prefix={<FullScreenOutlined />} value="2">
            进入全屏
          </Item>
          <Item prefix={<DownloadOutlined />} value="3">
            下载 PDF
          </Item>
          <Divider style={{ margin: 0 }} />
          <CascaderItem label="邮件推送" value="4" prefix={<EmailOutlined />}>
            <List>
              <Item value="4-1" label="创建邮件推送" prefix={<PlusOutlined />} />
              <Item value="4-1" label="邮件推送管理" prefix={<SettingOutlined />} />
            </List>
          </CascaderItem>
        </List>
      }
      placement="bottomLeft"
    >
      <Button>Dropdown</Button>
    </Dropdown>

    <br />
    <br />
    <br />
    <Dropdown
      {...args}
      content={
        <List>
          <Item value="4-1" label="创建邮件推送" prefix={<PlusOutlined />} />
          <Item value="4-1" label="邮件推送管理" prefix={<SettingOutlined />} />
        </List>
      }
    >
      <IconButton size="small" type="text">
        <MoreOutlined />
      </IconButton>
    </Dropdown>
  </>
);
export const Demo = DemoTemplate.bind({});
Demo.args = {};
const Template: Story<DropdownProps> = (args) => (
  <Dropdown
    {...args}
    content={
      <List style={{ padding: 0 }}>
        <Item prefix={<ReloadOutlined />} value="1">
          刷新数据
        </Item>
        <Item prefix={<FullScreenOutlined />} value="2">
          进入全屏
        </Item>
        <Item prefix={<DownloadOutlined />} value="3">
          下载 PDF
        </Item>
        <Divider style={{ margin: '0 0 4px' }} />
        <CascaderItem label="邮件推送" value="4" prefix={<EmailOutlined />}>
          <List>
            <Item value="4-1" label="创建邮件推送" prefix={<PlusOutlined />} />
            <Item value="4-1" label="邮件推送管理" prefix={<SettingOutlined />} />
          </List>
        </CascaderItem>
      </List>
    }
  >
    <IconButton size="small" type="text">
      <MoreOutlined />
    </IconButton>
  </Dropdown>
);
export const Default = Template.bind({});

Default.args = {};
