import React, { Key, useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { PlusOutlined, UserOutlined } from '@gio-design/icons';
import { SearchBar, Button } from '../..';
import Panel from '../Panel';
import TabPanel from '../TabPanel';
import { PanelProps } from '../interfaces';
import ToolBar from '../ToolBar';
import Table from '../Table';
import { Default as BatchActions } from './batchActions.stories';
import { dataSource1, dataSource2, columns1, columns2 } from '../__test__/tableData';
import '../style';

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
          scroll={{ x: 1200, y: 'calc(100vh - 359px)' as any }}
        />
      </TabPanel>
      <TabPanel key="2" name="权限">
        <ToolBar>
          <SearchBar style={{ width: 360 }} />
        </ToolBar>
        <ToolBar float="right">
          <Button prefix={<PlusOutlined />}>新建账号</Button>
          <Button type="secondary">次要按钮</Button>
          <Button type="secondary">次要按钮</Button>
        </ToolBar>
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
    <Panel {...args} style={{ height: 'calc(100vh - 40px)' }}>
      <TabPanel key="1" name="成员">
        <Table
          dataSource={dataSource1}
          columns={columns1}
          rowSelection={{ selectedRowKeys, onChange: setSelectedRowKeys }}
          scroll={{ x: 1200, y: 'calc(100vh - 359px)' as any }}
        />
      </TabPanel>
    </Panel>
  );
};

const TitleInfoCardStory: Story<PanelProps> = (args) => <Panel {...args} />;

export const TableCard = MultiplePanel.bind({});
TableCard.args = {
  title: '全部成员(233)',
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
  description: '这是一个副标题这是一个副标题',
  avatar: <UserOutlined />,
  actions: (
    <div>
      <Button style={{ marginRight: 8 }}>Button</Button>
      <Button type="secondary">Button</Button>
    </div>
  ),
  bordered: true,
};
