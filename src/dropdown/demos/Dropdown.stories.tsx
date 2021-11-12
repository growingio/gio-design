import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import {
  DownloadOutlined,
  EmailOutlined,
  FullScreenOutlined,
  PlusOutlined,
  ReloadOutlined,
  SettingOutlined,
} from '@gio-design/icons';
import Docs from './DropdownPage';
import Dropdown from '../index';
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
  },
} as Meta;

export const Default = () => (
  <Dropdown
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
);
