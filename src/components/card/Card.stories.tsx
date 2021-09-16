import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import Docs from './Card.mdx';
import { CardProps } from './interfaces';
import './style';

import Avatar from '../../avatar';
import Card from './index';
import Table from '../table';
import Button from '../button';

export default {
  title: 'Basic Components/Card',
  component: Card,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GrowingIO-Design-Components?node-id=489%3A831',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
} as Meta;

// eslint-disable-next-line react/jsx-props-no-spreading
const DemoListTemplate: Story = (args) => <div {...args} />;

export const Demo = DemoListTemplate.bind({});

Demo.args = {
  children: (
    <div>
      <div style={{ display: 'inline-block', marginRight: '20px' }}>
        <Card style={{ width: 320 }} title="卡片标题" />
        <hr />
        <Card style={{ width: 320 }}>
          <Card.Meta image={<Avatar>L</Avatar>} title="卡片标题" />
        </Card>
        <hr />
        <Card style={{ width: 320 }}>
          <Card.Meta image={<Avatar>L</Avatar>} title="卡片标题" description="卡片副标题" />
        </Card>
        <hr />
        <Card style={{ width: 320 }}>
          <Card.Meta image={<Avatar>L</Avatar>} title="卡片标题" description="卡片副标题">
            这里是卡片的描述，可以有很多很多字。这里是卡片的描述，可以有很多很多字。这里是卡片的描述，可以有很多很多字。
          </Card.Meta>
        </Card>
        <hr />
        <Card style={{ width: 320 }}>
          <Card.Meta image={<Avatar>L</Avatar>} title="卡片标题" description="卡片副标题">
            这里是卡片的描述，可以有很多很多字。这里是卡片的描述，可以有很多很多字。这里是卡片的描述，可以有很多很多字。
          </Card.Meta>
          <Card.Meta>
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
          </Card.Meta>
        </Card>
        <hr />
        <Card style={{ width: 320 }} footer="成员数: 27">
          <Card.Meta image={<Avatar>L</Avatar>} title="卡片标题" description="卡片副标题">
            这里是卡片的描述，可以有很多很多字。这里是卡片的描述，可以有很多很多字。这里是卡片的描述，可以有很多很多字。
          </Card.Meta>
          <Card.Meta>
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
          </Card.Meta>
        </Card>
      </div>
      <div style={{ display: 'inline-block', marginRight: '20px' }}>
        <Card style={{ width: 320 }}>
          <Card.Meta title="卡片标题" description="卡片副标题" />
        </Card>
        <hr />
        <Card style={{ width: 320 }}>
          <Card.Meta title="卡片标题" description="卡片副标题">
            这里是卡片的描述，可以有很多很多字。这里是卡片的描述，可以有很多很多字。这里是卡片的描述，可以有很多很多字。
          </Card.Meta>
        </Card>
        <hr />
        <Card style={{ width: 320 }}>
          <Card.Meta title="卡片标题" description="卡片副标题">
            这里是卡片的描述，可以有很多很多字。这里是卡片的描述，可以有很多很多字。这里是卡片的描述，可以有很多很多字。
          </Card.Meta>
          <Card.Meta>
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
          </Card.Meta>
        </Card>
        <hr />
        <Card style={{ width: 320 }} footer="卡片底部">
          <Card.Meta title="卡片标题" description="卡片副标题">
            这里是卡片的描述，可以有很多很多字。这里是卡片的描述，可以有很多很多字。这里是卡片的描述，可以有很多很多字。
          </Card.Meta>
          <Card.Meta>
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
          </Card.Meta>
        </Card>
        <hr />
        <Card style={{ width: 320 }} footer="卡片底部">
          <Card.Meta title="卡片标题" description="卡片副标题">
            这里是卡片的描述，可以有很多很多字。这里是卡片的描述，可以有很多很多字。这里是卡片的描述，可以有很多很多字。
          </Card.Meta>
        </Card>
      </div>
      <div style={{ display: 'inline-block', marginRight: '20px' }}>
        <Card style={{ width: 320 }}>
          <Card.Meta title="卡片标题" description="卡片副标题" />
          <Card.Meta>
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
          </Card.Meta>
        </Card>
        <hr />
        <Card style={{ width: 320 }} footer="卡片底部">
          <Card.Meta title="卡片标题" description="卡片副标题" />
          <Card.Meta>
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
          </Card.Meta>
        </Card>
        <hr />
        <Card style={{ width: 320 }}>
          <Card.Meta title="卡片标题" />
          <Card.Meta>
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
          </Card.Meta>
        </Card>
        <hr />
        <Card style={{ width: 320 }} footer="卡片底部">
          <Card.Meta title="卡片标题" />
          <Card.Meta>
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
          </Card.Meta>
        </Card>
      </div>
      <div style={{ display: 'inline-block', marginRight: '20px' }}>
        <Card style={{ width: 320 }}>
          <Card.Meta image={<Avatar>L</Avatar>} title="卡片标题">
            这里是卡片的描述，可以有很多很多字。这里是卡片的描述，可以有很多很多字。这里是卡片的描述，可以有很多很多字。
          </Card.Meta>
        </Card>
        <hr />
        <Card style={{ width: 320 }}>
          <Card.Meta image={<Avatar>L</Avatar>} title="卡片标题">
            这里是卡片的描述，可以有很多很多字。这里是卡片的描述，可以有很多很多字。这里是卡片的描述，可以有很多很多字。
          </Card.Meta>
          <Card.Meta>
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
          </Card.Meta>
        </Card>
        <hr />
        <Card style={{ width: 320 }} footer="成员数: 27">
          <Card.Meta image={<Avatar>L</Avatar>} title="卡片标题">
            这里是卡片的描述，可以有很多很多字。这里是卡片的描述，可以有很多很多字。这里是卡片的描述，可以有很多很多字。
          </Card.Meta>
          <Card.Meta>
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
          </Card.Meta>
        </Card>
        <hr />
        <Card style={{ width: 320 }} footer="成员数: 27">
          <Card.Meta image={<Avatar>L</Avatar>} title="卡片标题" description="卡片副标题">
            这里是卡片的描述，可以有很多很多字。这里是卡片的描述，可以有很多很多字。这里是卡片的描述，可以有很多很多字。
          </Card.Meta>
        </Card>
      </div>
      <div style={{ display: 'inline-block', marginRight: '20px' }}>
        <Card style={{ width: 320 }} footer="成员数: 27">
          <Card.Meta title="卡片标题" description="卡片副标题" />
        </Card>
        <hr />
        <Card style={{ width: 320 }} title="卡片标题" footer="成员数: 27" />
        <hr />
        <Card style={{ width: 320 }} footer="成员数: 27">
          <Card.Meta image={<Avatar>L</Avatar>} title="卡片标题" description="卡片副标题" />
        </Card>
        <hr />
        <Card style={{ width: 320 }} footer="成员数: 27">
          <Card.Meta image={<Avatar>L</Avatar>} title="卡片标题" />
        </Card>
      </div>
    </div>
  ),
};

const Template: Story<CardProps> = (args) => <Card {...args} />;

export const Default = Template.bind({});

Default.args = {
  style: { width: 320 },
  children: (
    <>
      <Card.Meta image={<Avatar>L</Avatar>} title="卡片标题" description="卡片副标题">
        这里是卡片的描述，可以有很多很多字。这里是卡片的描述，可以有很多很多字。这里是卡片的描述，可以有很多很多字。
      </Card.Meta>
    </>
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
      <Card.Meta image={<Avatar>L</Avatar>} title="卡片标题" description="卡片副标题">
        这里是卡片的描述，可以有很多很多字。这里是卡片的描述，可以有很多很多字。这里是卡片的描述，可以有很多很多字。
      </Card.Meta>
      <Card.Meta>
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
      </Card.Meta>
    </>
  ),
};

export const Footer = Template.bind({});

Footer.args = {
  footer: <Button size="small">按钮</Button>,
  disabled: false,
  onClick: () => ({}),
  clickable: false,
  style: { width: 320, height: 500 },
  children: (
    <>
      <Card.Meta image={<Avatar>L</Avatar>} title="卡片标题" description="卡片副标题">
        这里是卡片的描述，可以有很多很多字。这里是卡片的描述，可以有很多很多字。这里是卡片的描述，可以有很多很多字。
      </Card.Meta>
      <Card.Meta>
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
      </Card.Meta>
      <Card.Meta />
    </>
  ),
};
