import React, { Key, useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { PlusOutlined, UserOutlined } from '@gio-design/icons';
import SearchBar from '../../search-bar';
import Button from '../../button';
import Panel from '../Panel';
import TabPanel from '../TabPanel';
import { PanelProps } from '../interfaces';
import ToolBar from '../ToolBar';
import Table from '../Table';
import { Default as BatchActions } from './batchActions.stories';
import '../style';

interface ExampleData {
  a: string;
  b: string;
  c: string;
  d: string;
}

const dataSource1: ExampleData[] = Array.from({ length: 100 }, (_, key) => ({
  a: '表格内容',
  b: '表格内容',
  c: '表格内容',
  d: '表格内容',
  key: key.toString(),
}));

const dataSource2: ExampleData[] = Array.from({ length: 110 }, (_, key) => ({
  a: '表格内容2',
  b: '表格内容2',
  c: '表格内容2',
  d: '表格内容2',
  key: key.toString(),
}));

const columns1 = [
  {
    title: '头像',
    dataIndex: 'a',
  },
  {
    title: '列标题',
    dataIndex: 'd',
  },
  {
    title: '列标题',
    dataIndex: 'c',
  },
  {
    title: '列标题',
    dataIndex: 'd',
  },
];

const columns2 = [
  {
    title: '头像',
    dataIndex: 'a',
  },
  {
    title: '列标题2',
    dataIndex: 'd',
  },
  {
    title: '列标题2',
    dataIndex: 'c',
  },
  {
    title: '列标题2',
    dataIndex: 'd',
  },
];

export default {
  component: Panel,
  title: 'Upgraded/Panel',
  argTypes: {
    title: {
      table: { defaultValue: '' },
      description: '标题',
    },
    description: {
      table: { defaultValue: '' },
      description: '描述',
    },
    tabType: {
      table: { defaultValue: 'line' },
      description: 'TabNav的类型',
    },
    tabSize: {
      table: { defaultValue: 'middle' },
      description: 'TabNav的大小',
    },
    activeKey: {
      table: { defaultValue: undefined },
      description: '当前激活的tabPanel的key',
    },
    defaultActiveKey: {
      table: { defaultValue: undefined },
      description: '默认激活的tabPanel的key, 如设置activeKey 此值无效',
    },
    footer: {
      table: { defaultValue: undefined },
      description: '注脚部分',
    },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/wOB978UAlbYxjKXKL4CONN/%E5%8D%A1%E7%89%87%E5%BC%8F---%E8%AE%BE%E8%AE%A1%E6%94%B9%E7%89%88?node-id=303%3A141',
    },
    subcomponents: { TabPanel, ToolBar, Table },
  },
} as Meta;

const MultiplePanel: Story<PanelProps> = (args) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  return (
    <Panel {...args}>
      <TabPanel key="1" name="成员">
        <ToolBar>
          <SearchBar style={{ width: 360 }} />
        </ToolBar>
        {selectedRowKeys.length > 0 ? (
          <ToolBar float="right">
            <BatchActions count={selectedRowKeys.length} onClose={() => setSelectedRowKeys([])} />
          </ToolBar>
        ) : (
          <ToolBar float="right">
            <Button prefix={<PlusOutlined />}>新建账号</Button>
            <Button type="secondary">次要按钮</Button>
            <Button type="secondary">次要按钮</Button>
          </ToolBar>
        )}
        <Table
          dataSource={dataSource1}
          columns={columns1}
          rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
          scroll={{ x: 1200, y: 'calc(100vh - 359px)' }}
        />
      </TabPanel>
      <TabPanel key="2" name="权限">
        {/** Table高度自适应通过 scroll.y 实现 */}
        <Table dataSource={dataSource2} columns={columns2} scroll={{ y: 'calc(100vh - 359px)' as any }} />
      </TabPanel>
      <TabPanel key="3" name="资格">
        123
      </TabPanel>
    </Panel>
  );
};

const SinglePanel: Story<PanelProps> = (args) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  return (
    <Panel {...args}>
      <TabPanel key="1" name="成员">
        <Table
          dataSource={dataSource1}
          columns={columns1}
          rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
          scroll={{ x: 1200, y: 'calc(100vh - 359px)' }}
        />
      </TabPanel>
    </Panel>
  );
};

const TitleInfoCardStory: Story<PanelProps> = (args) => <Panel {...args} />;

export const TableCard = MultiplePanel.bind({});
TableCard.args = {
  title: '全部成员(233)',
  defaultActiveKey: '1',
  description: '这是一个副标题这是一个副标题这是一个副标题这是一个副标题这是一个副标题'.repeat(10),
};

export const TableCardSingle = SinglePanel.bind({});
TableCardSingle.args = {
  ...TableCard.args,
  description: <span>{'这是一个副标题这是一个副标题这是一个副标题这是一个副标题这是一个副标题'.repeat(10)}</span>,
};

export const TitleInfoCard = TitleInfoCardStory.bind({});
TitleInfoCard.args = {
  title: '北区项目组',
  footer: '这里是footer区域',
  description: '这是一个副标题这是一个副标题'.repeat(10),
  avatar: <UserOutlined />,
  actions: (
    <div>
      <Button style={{ marginRight: 8 }}>Button</Button>
      <Button type="secondary">Button</Button>
    </div>
  ),
  bordered: true,
  defaultActiveKey: '1',
};
