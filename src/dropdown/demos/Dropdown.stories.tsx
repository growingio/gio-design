/* eslint-disable no-console */
import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import {
  DownloadOutlined,
  EmailOutlined,
  FullScreenOutlined,
  PlusOutlined,
  ReloadOutlined,
  SettingOutlined,
  MoreHorizonalOutlined,
  DeleteOutlined,
  GeoPropertyOutlined,
  ListTypeOutlined,
} from '@gio-design/icons';
import Docs from './DropdownPage';
import Dropdown from '../index';
import '../style';
import Button from '../../button';
import List from '../../list';
import Divider from '../../divider';
import CascaderItem from '../../list/inner/CascaderItem';
import { PopConfirm } from '../..';

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

export const Default = () => (
  <Dropdown
    data-testid="template-dropdown"
    // 如果在 Table 中使用，并监听了 rowClick 事件，则需要使用此参数
    onContentClick={(event) => event.stopPropagation()}
    content={
      <List onChange={(changedValue, options) => console.log(changedValue, options)}>
        <List.Item prefix={<ReloadOutlined size="14px" />} value="1">
          刷新数据
        </List.Item>
        <List.Item prefix={<FullScreenOutlined size="14px" />} value="2">
          进入全屏
        </List.Item>
        <List.Item prefix={<DownloadOutlined size="14px" />} value="3">
          下载 PDF
        </List.Item>
      </List>
    }
  >
    <Button type="secondary" prefix={<MoreHorizonalOutlined />}>
      更多
    </Button>
  </Dropdown>
);

export const Confirm = () => (
  <Dropdown
    content={
      <List>
        <PopConfirm
          title="您确认要删除吗？"
          trigger="click"
          getContainer={() => document.body}
          onContentClick={(event) => event.stopPropagation()}
        >
          <div role="none" onClick={(event) => event.stopPropagation()}>
            <List.Item value="delete" prefix={<DeleteOutlined size="14px" />}>
              删除
            </List.Item>
          </div>
        </PopConfirm>
      </List>
    }
  >
    <Button type="secondary" prefix={<MoreHorizonalOutlined />}>
      更多
    </Button>
  </Dropdown>
);

export const Cascader = () => (
  <Dropdown
    content={
      <List>
        <CascaderItem
          label="邮件推送"
          value="4"
          prefix={<EmailOutlined size="14px" />}
          // 阻止 Dropdown 自动关闭
          onClick={(_, event) => event.stopPropagation()}
        >
          <List>
            <List.Item value="4-1" label="创建邮件推送" prefix={<PlusOutlined size="14px" />} />
            <List.Item value="4-1" label="邮件推送管理" prefix={<SettingOutlined size="14px" />} />
          </List>
        </CascaderItem>
      </List>
    }
  >
    <Button type="secondary" prefix={<MoreHorizonalOutlined />}>
      更多
    </Button>
  </Dropdown>
);

export const Disabled = () => (
  <Dropdown
    content={
      <List>
        <List.Item value="Apple">Apple</List.Item>
        <List.Item value="Orange">Orange</List.Item>
        <Divider style={{ margin: 0 }} />
        <List.Item value="Banana" disabled disabledTooltip="Can't click">
          Banana
        </List.Item>
      </List>
    }
  >
    <Button type="secondary" prefix={<MoreHorizonalOutlined />}>
      更多
    </Button>
  </Dropdown>
);

export const CustomItem = () => (
  <Dropdown
    content={
      <List>
        <CascaderItem
          label="系统语言"
          value="language"
          prefix={<GeoPropertyOutlined size="14px" />}
          // 阻止 Dropdown 自动关闭
          onClick={(_, event) => event.stopPropagation()}
        >
          <List>
            <List.Item value="zh-CN" label="简体中文" />
            <List.Item value="en-US" label="English" />
          </List>
        </CascaderItem>
        <List.Item
          value="version"
          style={{ cursor: 'auto', backgroundColor: '#fff' }}
          onClick={(_, event) => event.stopPropagation()}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ color: '#242e59' }}>
              <ListTypeOutlined size="1em" style={{ margin: '0 8px 0 0' }} />
              版本信息
            </div>
            <div style={{ color: '#a3adc8', fontSize: '12px' }}>当前版本：op-2.6.0</div>
          </div>
        </List.Item>
      </List>
    }
  >
    <Button type="secondary" prefix={<MoreHorizonalOutlined />}>
      更多
    </Button>
  </Dropdown>
);
