import React, { useMemo, useState } from 'react';
import { CloseOutlined, MoreOutlined, PlusCircleFilled, UserOutlined } from '@gio-design/icons';
import { Story, Meta } from '@storybook/react/types-6-0';
import Docs from './CardPage';
import { CardProps } from '../interfaces';
import '../style';
import Avatar from '../../avatar';
import Table from '../../table';
import Tabs, { Tab } from '../../tabs';
import Button from '../../button';
import Dropdown from '../../dropdown';
import { Item, List } from '../../list';
import { Card, Col, Divider, Row, SearchBar, Skeleton } from '../..';
import SkeletonImage from '../../skeleton/Image';
import Toggle from '../../toggle';

export default {
  title: 'Upgraded/Card',
  component: Card,
  subcomponents: { 'Card.Meta': Card.Meta },
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

export const Default: Story<CardProps> = (args) => <Card {...args} />;
Default.args = {
  style: { width: 320 },
  children: (
    <>
      <Card.Meta
        image={<Avatar>L</Avatar>}
        title="卡片标题"
        description="卡片副标题卡片副标题卡片副标题卡片副标题卡片副标题卡片副标题卡片副标题卡片副标题卡片副标题卡片副标题卡片副标题卡片副标题卡片副标题"
        action={
          <Button.IconButton size="small" type="text">
            <MoreOutlined />
          </Button.IconButton>
        }
      />
      <div style={{ marginTop: '16px' }}>
        这里是卡片的描述，可以有很多很多字。这里是卡片的描述，可以有很多很多字。这里是卡片的描述，可以有很多很多字。
      </div>
      <SkeletonImage
        style={{
          width: '100%',
          height: '200px',
          marginTop: '16px',
        }}
      />
    </>
  ),
};
export const BoxShadow = () => (
  <Card boxShadow style={{ width: '320px' }}>
    <Card.Meta
      title="卡片标题"
      description="卡片副标题卡片副标题卡片副标题卡片副标题卡片副标题卡片副标题卡片副标题卡片副标题卡片副标题卡片副标题卡片副标题卡片副标题卡片副标题"
      action={
        <Button.IconButton size="small" type="text">
          <MoreOutlined />
        </Button.IconButton>
      }
    />
    <div style={{ marginTop: '16px' }}>
      这里是卡片的描述，可以有很多很多字。这里是卡片的描述，可以有很多很多字。这里是卡片的描述，可以有很多很多字。
    </div>
    <SkeletonImage
      style={{
        width: '100%',
        height: '200px',
        marginTop: '16px',
      }}
    />
  </Card>
);
export const WithoutContent = () => (
  <Card style={{ width: '320px' }}>
    <Card.Meta
      image={
        <Avatar src="https://joeschmoe.io/api/v1/random" size="large" mode="square">
          L
        </Avatar>
      }
      title="卡片标题"
      description="卡片副标题"
      action={
        <Button.IconButton size="small" type="text">
          <MoreOutlined />
        </Button.IconButton>
      }
    />
  </Card>
);
export const Disabled = () => (
  <Card disabled style={{ width: '320px' }}>
    <Card.Meta
      image={
        <Avatar src="https://joeschmoe.io/api/v1/random" size="large" mode="square">
          L
        </Avatar>
      }
      title="卡片标题"
      description="卡片副标题"
      action={
        <Button.IconButton size="small" type="text" onClick={() => alert('action click')}>
          <MoreOutlined />
        </Button.IconButton>
      }
    />
  </Card>
);
export const GridCard = () => (
  <div style={{ minWidth: '800px', maxWidth: '1200px' }}>
    <Row alignContent="stretch" alignItems="stretch" direction="row" gutter={[8, 8]}>
      <Col span={4}>
        <Card style={{ height: '280px' }} boxShadow>
          <Card.Meta
            image={<Avatar src="https://joeschmoe.io/api/v1/random">z</Avatar>}
            title="卡片标题"
            description="卡片副标题"
            action={
              <Button.IconButton size="small" type="text">
                <MoreOutlined />
              </Button.IconButton>
            }
          />
          <Skeleton active={false} paragraph={{ row: 2 }} />
          <div
            style={{
              marginTop: 'auto',
              paddingTop: '16px',
              color: '#313e75',
              lineHeight: '20px',
              borderTop: '1px solid #ebedf5',
              width: '100%',
            }}
          >
            <UserOutlined /> 张三
          </div>
        </Card>
      </Col>
      <Col span={4}>
        <Card style={{ height: '280px' }} boxShadow clickable={false}>
          <Card.Meta
            title="卡片标题"
            description="卡片副标题"
            action={
              <Button.IconButton size="small" type="text">
                <MoreOutlined />
              </Button.IconButton>
            }
          />
          <Table
            style={{ marginTop: '16px' }}
            pagination={false}
            dataSource={[
              { a: 1, b: 1 },
              { a: 2, b: 2 },
            ]}
            rowKey="a"
            columns={[
              { dataIndex: 'a', title: 'A' },
              { dataIndex: 'b', title: 'B' },
            ]}
          />
        </Card>
      </Col>
      <Col span={4}>
        <Card style={{ height: '280px' }} boxShadow>
          <Card.Meta
            image={<Avatar src="https://joeschmoe.io/api/v1/random">z</Avatar>}
            title="卡片标题"
            description="卡片副标题"
            action={
              <Button.IconButton size="small" type="text">
                <MoreOutlined />
              </Button.IconButton>
            }
          />
          <SkeletonImage style={{ width: '100%', marginTop: '16px' }} />
        </Card>
      </Col>
    </Row>
  </div>
);
export const FullWidthContent = () => (
  <Card fullWidthContent style={{ width: '400px' }}>
    <Card.Meta
      image={
        <Avatar src="https://joeschmoe.io/api/v1/random" size="large" mode="square">
          L
        </Avatar>
      }
      title="卡片标题"
      description="卡片副标题"
      action={
        <Button.IconButton size="small" type="text">
          <MoreOutlined />
        </Button.IconButton>
      }
    />
    <SkeletonImage style={{ width: '100%', marginTop: '16px' }} />
  </Card>
);

export const Clickable = () => {
  const [clickable, setClickable] = useState(true);
  return (
    <div style={{ width: '400px' }}>
      <Toggle
        on={clickable}
        onChange={(e) => setClickable(e.target.checked)}
        checkedChildren={<span>可点击</span>}
        uncheckedChildren={<span>不可点击</span>}
      />
      <Divider />
      <Card style={{ width: '280px' }} boxShadow clickable={clickable}>
        <Card.Meta
          image={<Avatar src="https://joeschmoe.io/api/v1/random">z</Avatar>}
          title="卡片标题"
          description="卡片副标题"
          action={
            <Button.IconButton size="small" type="text">
              <MoreOutlined />
            </Button.IconButton>
          }
        />
        <Skeleton active={false} paragraph={{ row: 2 }} />
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '16px',
            color: '#313e75',
            lineHeight: '20px',
            borderTop: '1px solid #ebedf5',
            width: '100%',
          }}
        >
          <UserOutlined /> 张三
        </div>
      </Card>
    </div>
  );
};

export const ComplexCard = () => {
  const memberTotal = 44;
  const dataSource = useMemo(
    () =>
      Array.from({ length: memberTotal }).map((_, index) => ({
        id: `${index + 1 * 1000}`,
        age: index + 1,
        name: `Name ${index + 1}`,
        address: `北京市朝阳公园`,
      })),
    []
  );
  const members = () => (
    <Table
      columns={[
        {
          dataIndex: 'id',
          title: 'Id',
          info: 'description',
        },
        {
          dataIndex: 'name',
          title: '姓名',
        },
        {
          dataIndex: 'age',
          title: '年龄',
        },
        {
          dataIndex: 'address',
          title: '住址',
        },
      ]}
      dataSource={dataSource}
      rowKey="id"
    />
  );
  return (
    <Card fullWidthContent clickable={false} boxShadow>
      <Card.Meta
        image={
          <Avatar src="https://joeschmoe.io/api/v1/random" size="large" mode="square">
            L
          </Avatar>
        }
        title={
          <span
            style={{
              fontSize: '18px',
              lineHeight: '28px',
            }}
          >
            企业成员({memberTotal})
          </span>
        }
        description="可查看企业管理相关权限，无法访问客户数据平台，推荐给各业务人员，或无需做数据管理的同事设置此角色。"
        action={
          <>
            <Button size="small" prefix={<PlusCircleFilled />} style={{ marginRight: '8px' }}>
              主要按钮
            </Button>
            <Button size="small" type="secondary" style={{ marginRight: '8px' }}>
              次要按钮
            </Button>
            <Dropdown
              placement="bottomRight"
              content={
                <List>
                  <Item value="edit">编辑</Item>
                  <Item value="delete">删除</Item>
                </List>
              }
            >
              <Button.IconButton size="small" type="secondary">
                <MoreOutlined />
              </Button.IconButton>
            </Dropdown>
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
          {members()}
        </Tab>
        <Tab label="权限" value="2">
          <Table
            columns={[
              { dataIndex: 'moduleKey', key: 'moduleKey', title: '功能' },
              { dataIndex: 'permission', key: 'permission', title: '权限' },
            ]}
          />
        </Tab>
      </Tabs>
    </Card>
  );
};

export const ComplexCardPanel = () => {
  const memberTotal = 44;
  const dataSource = useMemo(
    () =>
      Array.from({ length: memberTotal }).map((_, index) => ({
        id: `${index + 1 * 1000}`,
        age: 21 + index,
        name: `Name ${index + 1}`,
        address: `北京市朝阳公园`,
      })),
    []
  );
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const renderToolbar = () => (
    <div style={{ padding: '20px 14px', display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <SearchBar style={{ width: '320px' }} placeholder="按姓名搜索" />
      </div>
      <div>
        {selectedRowKeys?.length > 0 && (
          <div style={{ display: 'inline-block' }}>
            已选择 {selectedRowKeys?.length} 项
            <Button.IconButton type="text" size="small" onClick={() => setSelectedRowKeys([])}>
              <CloseOutlined />
            </Button.IconButton>
            <Divider orientation="vertical" />
            <Button>全部删除</Button>
          </div>
        )}
        {selectedRowKeys?.length === 0 && (
          <>
            <Button style={{ marginRight: '8px' }} prefix={<PlusCircleFilled />}>
              主要操作
            </Button>
            <Button type="secondary">次要操作</Button>
          </>
        )}
      </div>
    </div>
  );
  return (
    <Card boxShadow fullWidthContent clickable={false} style={{ display: 'block' }}>
      <Card.Meta
        style={{ borderBottom: '1px solid #dfe4ee', padding: '20px' }}
        title={
          <span
            style={{
              fontSize: '18px',
              lineHeight: '28px',
            }}
          >
            全部成员 (233)
          </span>
        }
      />
      {renderToolbar()}
      <div>
        <Table
          columns={[
            {
              dataIndex: 'id',
              title: 'Id',
              info: 'description',
            },
            {
              dataIndex: 'name',
              title: '姓名',
            },
            {
              dataIndex: 'age',
              title: '年龄',
            },
            {
              dataIndex: 'address',
              title: '住址',
            },
          ]}
          scroll={{ y: 600 }}
          rowSelection={{
            selectedRowKeys,
            onChange: (selectedKeys) => {
              setSelectedRowKeys(selectedKeys as string[]);
            },
            columnWidth: 60,
          }}
          dataSource={dataSource}
          rowKey="id"
        />
      </div>
    </Card>
  );
};
