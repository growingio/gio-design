/* eslint-disable no-console */
import React, { useState } from 'react';
import { Meta } from '@storybook/react/types-6-0';
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
import Dropdown from '../index';
import '../style';
import Button from '../../button';
import List, { Item } from '../../list';
import Divider from '../../divider';
import CascaderItem from '../../list/inner/CascaderItem';
import { PopConfirm, Tooltip } from '../..';

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

export const Demo = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <h3>Use Case -1看板中“更多”按钮</h3>
      <Dropdown
        content={
          <List>
            <Item prefix={<ReloadOutlined size="14px" />} value="1">
              刷新数据
            </Item>
            <Item prefix={<FullScreenOutlined size="14px" />} value="2">
              进入全屏
            </Item>
            <Item prefix={<DownloadOutlined size="14px" />} value="3">
              下载PDF
            </Item>
            <Item prefix={<DownloadOutlined size="14px" />} value="4">
              下载图片
            </Item>
            <Item prefix={<PinOutlined size="14px" />} value="5">
              取消订阅
            </Item>
            <Item prefix={<DeleteOutlined size="14px" />} value="6">
              删除看板
            </Item>
            <Divider style={{ margin: '0 0 4px' }} />
            <CascaderItem label="邮件推送" value="4" prefix={<EmailOutlined size="14px" />}>
              <List>
                <Item value="4-1" label="创建邮件推送" prefix={<PlusOutlined size="14px" />} />
                <Item value="4-1" label="邮件推送管理" prefix={<SettingOutlined size="14px" />} />
              </List>
            </CascaderItem>
          </List>
        }
        placement="bottomLeft"
      >
        <Button type="secondary" prefix={<MoreHorizonalOutlined />}>
          更多
        </Button>
      </Dropdown>
      <h3>Use Case -2列表/卡片中的操作菜单</h3>
      <Dropdown
        visible={visible}
        onVisibleChange={(e) => setVisible(e)}
        content={
          <List>
            <Item
              prefix={<ReloadOutlined size="14px" />}
              value="1"
              onClick={() => {
                console.log('tttt');
                setVisible(false);
              }}
            >
              添加到看板
            </Item>
            <Item prefix={<FullScreenOutlined size="14px" />} value="2" onClick={() => setVisible(false)}>
              编辑
            </Item>
            <PopConfirm
              title={123 as any}
              desc={321 as any}
              trigger="click"
              placement="top"
              onConfirm={() => setVisible(false)}
              onCancel={() => setVisible(false)}
              getContainer={() => document.body}
              overlayStyle={{ zIndex: 1060 }}
              okText="确认"
              cancelText="取消"
              onVisibleChange={() => console.log('visible')}
            >
              <Tooltip title="111">
                <span>
                  <Item prefix={<DownloadOutlined size="14px" />} value="3">
                    删除
                  </Item>
                </span>
              </Tooltip>
            </PopConfirm>
          </List>
        }
      >
        <Button.IconButton type="secondary">
          <MoreOutlined />
        </Button.IconButton>
      </Dropdown>
    </>
  );
};

export const Default = () => (
  <>
    <p>Dropdown 在非受控模式下，会在 content 外包一层 div，并且监听该 div 的 onClick 事件，以实现自动隐藏和显示。</p>
    <p>
      如果触发元素为 Button 或者 IconButton，Dropdown 在展开的时候会添加一个 active 参数，如果不需要，可以在 Button 或者
      IconButton 中设置 active={`{false}`} 来强制覆盖。
    </p>
    <Dropdown
      data-testid="template-dropdown"
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
          <PopConfirm
            title="您确认要删除吗？"
            trigger="click"
            getContainer={() => document.body}
            onContentClick={(event) => event.stopPropagation()}
          >
            {/** 需要包裹一层 div，因为 List.Item onClick 的参数跟 PopConfirm 里监听 trigger onClick 的参数不一致，List.Item onClick 返回的参数为 value 而不是 event */}
            <div role="none" onClick={(event) => event.stopPropagation()}>
              <List.Item value="delete" prefix={<DeleteOutlined size="14px" />}>
                删除
              </List.Item>
            </div>
          </PopConfirm>
          <Divider style={{ margin: '0 0 4px' }} />
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
      // 如果在 Table 中使用，并监听了 rowClick 事件，则需要使用此参数
      onContentClick={(event) => event.stopPropagation()}
    >
      <Button type="secondary" prefix={<MoreHorizonalOutlined />}>
        更多
      </Button>
    </Dropdown>
  </>
);

export const Disabled = () => (
  <>
    <h4>不可用的菜单项，和分割线。</h4>
    <p>如果不想 Dropdown 自动隐藏，可以在 ListItem 上添加 onClick 监听器，阻止事件冒泡。</p>
    <Dropdown
      content={
        <List>
          <List.Item value="Apple">Apple</List.Item>
          <List.Item value="Orange">Orange</List.Item>
          <Divider style={{ margin: 0 }} />
          <List.Item value="Banana" disabled>
            Banana
          </List.Item>
        </List>
      }
    >
      <Button type="secondary" prefix={<MoreHorizonalOutlined />}>
        更多
      </Button>
    </Dropdown>
  </>
);
