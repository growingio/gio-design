import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import Docs from './CardPage';
import { CardProps } from '../interfaces';
import '../style';

import Avatar from '../../avatar';
import Card from '../index';
import Table from '../../table';
import Button from '../../components/button';

export default {
  title: 'Data Display/Card',
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
