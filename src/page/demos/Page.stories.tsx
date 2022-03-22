import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import Docs from './PagePage';
import Page, { PageProps } from '../index';
import { Button } from '../..';
import TablePng from '../assets/table.png';
import '../style';

export default {
  title: 'upgraded/Page',
  component: Page,
  parameters: {
    docs: {
      page: Docs,
    },
    argTypes: {
      description: {
        control: { type: 'text' },
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Design?node-id=4093%3A45839',
      allowFullscreen: true,
    },
  },
} as Meta;

const defaultCTA = {
  text: '返回首页',
  onClick: action('Call to Action'),
};

const arr: PageProps['type'][] = [
  'empty',
  'noData',
  'noResult',
  'noFind',
  'noAuth',
  'noResource',
  'noShared',
  'type304',
  'type404',
  'type500',
];
const demoTemplate: Story<PageProps> = (args) => (
  <>
    <table className="table-demo">
      <thead>
        <tr>
          <th>Controls</th>
          <th>Example</th>
        </tr>
      </thead>
      <tbody>
        {arr.map((item: PageProps['type']) => (
          <tr key={item}>
            <td>{item}</td>
            <td>
              <Page {...args} type={item} />
              <Page
                {...args}
                size="small"
                type={item}
                cta={null}
                description={
                  <>
                    {item}
                    <Button type="text" size="small">
                      从{item}中移除
                    </Button>
                  </>
                }
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
);

export const Demo = demoTemplate.bind({});
Demo.args = {
  cta: defaultCTA,
  style: {
    display: 'inline-block',
  },
};
const Template: Story<PageProps> = (args) => <Page {...args} />;

export const noAuth = Template.bind({});
noAuth.args = {
  type: 'noAuth',
  description: '无访问权限，请联系管理员',
  cta: defaultCTA,
};

export const Custom = Template.bind({});
Custom.args = {
  image: <img src={TablePng} alt="" />,
  description: 'this is custom description',
};
export const noResource = Template.bind({});
noResource.args = {
  type: 'noResource',
  description: (
    <>
      该看板已删除{' '}
      <Button size="small" type="text">
        取消订阅
      </Button>
    </>
  ),
  cta: defaultCTA,
};
export const noShared = Template.bind({});
noShared.args = {
  type: 'noShared',
  description: (
    <>
      此看板已取消与你共享{' '}
      <Button size="small" type="text">
        取消订阅
      </Button>
    </>
  ),
  cta: defaultCTA,
};
export const NotFound = Template.bind({});
NotFound.args = {
  type: 'type404',
  description: '抱歉，出现了一个错误，页面不见了',
  cta: defaultCTA,
};

export const InternalServerError = Template.bind({});
InternalServerError.args = {
  type: 'type500',
  description: '抱歉，服务器出现了错误',
  cta: defaultCTA,
};
