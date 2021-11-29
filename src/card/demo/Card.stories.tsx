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
import { HaveChildren } from '../../tabs/demos/Tabs.stories';
import { Card, Divider } from '../..';
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

const infoCardTemplate = () => (
  <Card fullWidthContent>
    <Card.Meta
      image={<Avatar mode="square" size="large" />}
      description="这里是副标题"
      title={
        <div
          style={{
            fontWeight: 500,
            fontSize: '18px',
            lineHeight: '28px',
            color: '#242e59',
          }}
        >
          北区项目组
        </div>
      }
      action={
        <>
          <Button style={{ marginRight: '8px' }}>Button</Button>
          <Button type="secondary">Button</Button>
        </>
      }
    />
    <Divider
      style={{
        width: '100%',
        margin: '0px',
      }}
    />
    <Basic />
  </Card>
);

export const infoCard = infoCardTemplate.bind({});
const tableCardTemplate = () => (
  <Card fullWidthContent>
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
    />
    <Text
      style={{
        color: '#7b819c',
        fontSize: '14px',
        padding: '0 16px',
        marginTop: '-8px',
        marginBottom: '20px',
      }}
      lines={3}
    >
      这是一个副标题这是一个副标题这是一个副标题这是一个副标题这是一这是一个副标题这是一个副标题这是一个副标题这是一个副标题这是一这是一个副标题这是一个副标题这是一个副标题这是一个副标题这是一个副标题这是一个副标题这是一个副标题这是一个副标题这是一个副标题这是一个副标题这是一个副标题这是一个副标题这是一个副标题这是一个副标题这是一个副标题这是一个副标题这是一个副标题这是一个副标题这是一个副标题这是一个副标题这是一个副标题这是一个副
    </Text>
    <Tabs
      tabListStyle={{
        borderBottom: '1px solid #dfe4ee',
        borderRadius: '0px',
        paddingLeft: '8px',
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
  <div>
    <div style={{ margin: '20px', display: 'inline-block' }}>
      {infoCardTemplate()}
      {tableCardTemplate()}
    </div>
    <div style={{ margin: '20px', display: 'inline-block' }}>
      <Card>
        <Card.Meta title="变量使用量" description="variable_userd" />
        <Empty />
        <TreeData />
      </Card>
    </div>
    <div style={{ margin: '20px', display: 'inline-block' }}>
      <Card>
        <Card.Meta title="变量使用量" description="variable_userd" />
        <HaveChildren />
      </Card>
    </div>
  </div>
);

export const Demo = DemoTemplate.bind({});
const Template: Story<CardProps> = (args) => <Card {...args} />;

export const Default = Template.bind({});

Default.args = {
  style: { width: 320 },
  children: (
    <Card.Meta
      image={<Avatar>L</Avatar>}
      title="卡片标题"
      description="卡片副标题"
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
