import React from 'react';
import { MoreOutlined } from '@gio-design/icons';
import { Story, Meta } from '@storybook/react/types-6-0';
import Docs from './CardPage';
import { CardProps } from '../interfaces';
import '../style';
import Avatar from '../../avatar';
import Table from '../../table';
import Tabs, { Tab } from '../../tabs';
import Button, { IconButton } from '../../button';
import Dropdown from '../../dropdown';
import { Item, List } from '../../list';
import { Basic, Empty, TreeData } from '../../table/demos/Table.stories';
import { Card, Skeleton } from '../..';
import Text from '../../typography/text';

export default {
  title: 'upgraded/Card',
  component: Card,
  subcomponents: { CardMeta: Card.Meta },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=4092%3A41174',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
} as Meta;

const tableCardTemplate = () => (
  <Card fullWidthContent clickable={false} boxShadow>
    <Card.Meta
      title={
        <div
          style={{
            fontWeight: 500,
            fontSize: '18px',
            lineHeight: '28px',
            color: '#242e59',
          }}
        >
          全部成员(233)
        </div>
      }
      style={{ alignItems: 'flex-start' }}
      description={
        <Text
          style={{
            color: '#7b819c',
            fontSize: '14px',
            width: '100%',
            textOverflow: 'ellipsis',
            whiteSpace: 'normal',
          }}
          lines={2}
        >
          这是一个副标题这是一个副标题这是一个副标题这是一个副标题这是一这是一个副标题这是一个副标题这是一个副标题这是一个副标题这是一这是一个副标题这是一个副标题这是一个副标题这是一个副标题这是一个副标题这是一个副标题这是一个副标题这是一个副标题这是一个副标题这是一个副标题这是一个副标题这是一个副标题这是一个副标题这是一个副标题这是一个副标题这是一个副标题这是一个副标题这是一个副标题这是一个副标题这是一个副标题这是一个副标题这是一个副
        </Text>
      }
      image={<Avatar mode="square" size="large" />}
      action={
        <>
          <Button style={{ marginRight: '8px' }}>Button</Button>
          <Button type="secondary">Button</Button>
        </>
      }
    />
    <Tabs
      tabListStyle={{
        borderBottom: '1px solid #dfe4ee',
        borderRadius: '0px',
        padding: '0 20px',
      }}
      defaultValue="1"
    >
      <Tab label="成员" value="1">
        <Basic />
      </Tab>
      <Tab label="权限" value="2">
        <Empty />
      </Tab>
    </Tabs>
  </Card>
);

export const tableCard = tableCardTemplate.bind({});

const DemoTemplate = () => (
  <table className="table-demo">
    <tr>
      <th>Card</th>
      <th>Example</th>
    </tr>
    <tr>
      <td>TableCard</td>
      <td>{tableCardTemplate()}</td>
    </tr>
    <tr>
      <td>TableCard</td>
      <td>
        <Card>
          <Card.Meta title="变量使用量" description="variable_userd" />
          <Empty />
          <TreeData />
        </Card>
      </td>
    </tr>
    <tr>
      <td>previewCard</td>
      <td>
        <Card style={{ width: '320px' }}>
          <Card.Meta title="计算指标" description="123" />
          <p>计算属性如下</p>
          <Skeleton.Image style={{ width: '100%' }} />
          <Table
            title="事件属性"
            pagination={false}
            columns={[
              {
                dataIndex: 'id',
                title: 'Id',
              },
              {
                dataIndex: 'name',
                title: 'Name',
              },
            ]}
            dataSource={Array(2)
              .fill('')
              .map((_, index) => ({
                id: `${index + 1 * 1000}`,
                name: `Name ${index + 1}`,
              }))}
          />
        </Card>
      </td>
    </tr>
  </table>
);

export const Demo = DemoTemplate.bind({});
const Template: Story<CardProps> = (args) => <Card {...args} />;

export const Default = Template.bind({});

Default.args = {
  style: { width: 320 },
  children: (
    <Card.Meta
      image={<Avatar>L</Avatar>}
      title={'卡片标题'.repeat(20)}
      description={'卡片副标题卡片副标题卡片副标题卡片副标题卡片副标题卡片副标题卡片副标题卡片副标题卡片副标题卡片副标题卡片副标题卡片副标题卡片副标题'.repeat(
        5
      )}
      action={
        <Dropdown
          placement="bottomRight"
          content={
            <List style={{ padding: '0' }}>
              <Item value="1">111111</Item>
              <Item value="2">222222</Item>
            </List>
          }
        >
          <IconButton size="small" type="text">
            <MoreOutlined />
          </IconButton>
        </Dropdown>
      }
    />
  ),
};

export const Disabled = Template.bind({});

Disabled.args = {
  style: { width: 320 },
  disabled: true,
  children: (
    <>
      <Card.Meta image={<Avatar>L</Avatar>} title="卡片标题" description="卡片副标题">
        这里是卡片的描述，可以有很多很多字。这里是卡片的描述，可以有很多很多字。这里是卡片的描述，可以有很多很多字。
      </Card.Meta>
    </>
  ),
};

export const Multiple = Template.bind({});

Multiple.args = {
  disabled: false,
  onClick: () => ({}),
  clickable: true,
  style: { width: 320 },
  children: (
    <>
      <Card.Meta image={<Avatar>L</Avatar>} title="卡片标题" description="卡片副标题" action={<Button>提交</Button>} />
      <Table
        pagination={false}
        dataSource={[
          { a: 1, b: 1 },
          { a: 2, b: 2 },
        ]}
        columns={[
          { dataIndex: 'a', title: 'A' },
          { dataIndex: 'b', title: 'B' },
        ]}
      />
    </>
  ),
};

export const onlyDes = Template.bind({});

onlyDes.args = {
  footer: <Button size="small">按钮</Button>,
  disabled: false,
  onClick: () => ({}),
  clickable: false,
  style: { width: 320 },
  children: (
    <>
      <Card.Meta
        description="这里是卡片的描述，可以有很多很多字。这里是卡片的描述，可以有很多很多字。这里是卡片的描述，可以有很多很多字。 "
        action={
          <Dropdown
            placement="bottomRight"
            content={
              <List style={{ padding: '0' }}>
                <Item value="1">111111</Item>
                <Item value="2">222222</Item>
              </List>
            }
          >
            <IconButton size="small" type="text">
              <MoreOutlined />
            </IconButton>
          </Dropdown>
        }
      />
      <Table
        dataSource={[
          { a: 1, b: 1 },
          { a: 2, b: 2 },
        ]}
        columns={[
          { dataIndex: 'a', title: 'A' },
          { dataIndex: 'b', title: 'B' },
        ]}
      />
    </>
  ),
};
