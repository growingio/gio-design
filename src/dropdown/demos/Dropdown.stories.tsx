import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import {
  DownloadOutlined,
  EmailOutlined,
  FullScreenOutlined,
  PlusOutlined,
  ReloadOutlined,
  SettingOutlined,
  MoreHorizonalOutlined,
  PinOutlined,
  DeleteOutlined,
  MoreOutlined,
} from '@gio-design/icons';
import Docs from './DropdownPage';
import Dropdown, { DropdownProps } from '../index';
import '../style';
import Button from '../../button';
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

export const Demo = () => (
  <>
    <h3>Use Case -1看板中“更多”按钮</h3>
    <Dropdown
      content={
        <List style={{ padding: 0 }}>
          <Item prefix={<ReloadOutlined />} value="1">
            刷新数据
          </Item>
          <Item prefix={<FullScreenOutlined />} value="2">
            进入全屏
          </Item>
          <Item prefix={<DownloadOutlined />} value="3">
            下载PDF
          </Item>
          <Item prefix={<DownloadOutlined />} value="4">
            下载图片
          </Item>
          <Item prefix={<PinOutlined />} value="5">
            取消订阅
          </Item>
          <Item prefix={<DeleteOutlined />} value="6">
            删除看板
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
      placement="bottomLeft"
    >
      <Button type="secondary">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <MoreHorizonalOutlined
            style={{
              marginRight: '8px',
            }}
          />
          更多
        </div>
      </Button>
    </Dropdown>
    <h3>Use Case -2列表/卡片中的操作菜单</h3>
    <Dropdown
      content={
        <List style={{ padding: 0 }}>
          <Item prefix={<ReloadOutlined />} value="1">
            添加到看板
          </Item>
          <Item prefix={<FullScreenOutlined />} value="2">
            编辑
          </Item>
          <Item prefix={<DownloadOutlined />} value="3">
            删除
          </Item>
        </List>
      }
    >
      <Button.IconButton type="secondary">
        <MoreOutlined />
      </Button.IconButton>
    </Dropdown>
  </>
);
const Template: Story<DropdownProps> = (args) => <Dropdown {...args} />;
export const Default = Template.bind({});
Default.args = {
  content: (
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
  ),
  children: (
    <Button type="secondary">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <MoreHorizonalOutlined
          style={{
            marginRight: '8px',
          }}
        />
        更多
      </div>
    </Button>
  ),
};
