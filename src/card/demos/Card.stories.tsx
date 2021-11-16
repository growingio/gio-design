import React, { useEffect, useState } from 'react';
import { MoreOutlined } from '@gio-design/icons';
import { Story, Meta } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import Docs from './CardPage';
import { CardProps } from '../interfaces';
import '../style';
import Avatar from '../../avatar';
import Card from '../index';
import Table from '../../table';
import Button, { IconButton } from '../../button';
import { Dropdown, Skeleton } from '../..';
import { Item, List } from '../../list';

export default {
  title: 'upgraded/Card',
  component: Card,
  decorators: [withDesign],
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
const a = 'https://api.github.com/repos/growingio/gio-design/contributors';

const DemoTemplate = () => {
  const [data, setData] = useState<Array<any>>([]);

  useEffect(() => {
    const fet = async () => {
      const s = await fetch(a).then((response) => response.json());
      setData(s);
      return s;
    };
    fet();
  }, []);

  return (
    <div>
      <Skeleton loading={!data.length}>
        {data &&
          data.map((item) => (
            <div style={{ margin: '20px', display: 'inline-block' }}>
              <Card>
                <Card.Meta
                  image={<Avatar src={item.avatar_url} />}
                  title={item.login}
                  description="卡片副标题"
                  action={
                    <Dropdown
                      placement="bottomRight"
                      overlay={
                        <List>
                          <Item value={1}>test</Item>
                        </List>
                      }
                    >
                      <IconButton size="small" type="text">
                        <MoreOutlined />
                      </IconButton>
                    </Dropdown>
                  }
                >
                  <Card.Meta>
                    <img src={item.avatar_url} alt="" />
                  </Card.Meta>
                </Card.Meta>
              </Card>
            </div>
          ))}
      </Skeleton>
    </div>
  );
};

export const Demo = DemoTemplate.bind({});
const Template: Story<CardProps> = (args) => <Card {...args} />;

export const Default = Template.bind({});

Default.args = {
  style: { width: 320 },
  children: (
    <>
      <Card.Meta
        image={<Avatar>L</Avatar>}
        title="卡片标题"
        description="卡片副标题"
        action={
          <Dropdown
            placement="bottomRight"
            overlay={
              <List>
                <Item value={1}>111111</Item>
                <Item value={2}>222222</Item>
              </List>
            }
          >
            <IconButton size="small" type="text">
              <MoreOutlined />
            </IconButton>
          </Dropdown>
        }
      />
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
      <Card.Meta image={<Avatar>L</Avatar>} title="卡片标题" description="卡片副标题" action={<Button>提交</Button>}>
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
      <Card.Meta
        image={<Avatar>L</Avatar>}
        title="卡片标题"
        description="卡片副标题"
        action={
          <Dropdown
            placement="bottomRight"
            overlay={
              <List>
                <Item value={1}>111111</Item>
                <Item value={2}>222222</Item>
              </List>
            }
          >
            <IconButton size="small" type="text">
              <MoreOutlined />
            </IconButton>
          </Dropdown>
        }
      >
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
    </>
  ),
};
