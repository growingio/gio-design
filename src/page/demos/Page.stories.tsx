import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import Docs from './PagePage';
import Page, { PageProps } from '../index';
import { Link } from '../..';

import '../style';

export default {
  title: 'upgraded/Page',
  component: Page,
  parameters: {
    docs: {
      page: Docs,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=4093%3A45839',
      allowFullscreen: true,
    },
  },
} as Meta;

const defaultCTA = {
  text: '返回首页',
  onClick: action('Call to Action'),
};

const arr: any = ['noAuth', 'noResource', 'noShared', 404, 500];
const demoTemplate: Story<PageProps> = (args) => (
  <>
    {arr.map((item: PageProps['statusCode']) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'flex-end',
        }}
      >
        <Page {...args} statusCode={item} />
        <Page
          {...args}
          statusCode={item}
          cta={null}
          description={
            <>
              该看板已删除 <Link href="http://localhost:6006/?path=/story/components-page--demo">取消订阅</Link>
            </>
          }
        />
        <Page
          {...args}
          size="small"
          statusCode={item}
          cta={null}
          description={
            <>
              该单图已删除 <Link href="http://localhost:6006/?path=/story/components-page--demo">从当前看板中移除</Link>
            </>
          }
        />
      </div>
    ))}
  </>
);
export const Demo = demoTemplate.bind({});
Demo.args = {
  description: 'you can use your custom contents  ',
  cta: defaultCTA,
  style: {
    display: 'inline-block',
  },
};
const Template: Story<PageProps> = (args) => <Page {...args} />;

export const noAuth = Template.bind({});
noAuth.args = {
  statusCode: 'noAuth',
  description: '无访问权限，请联系管理员',
  cta: defaultCTA,
};
export const noResource = Template.bind({});
noResource.args = {
  statusCode: 'noResource',
  description: (
    <>
      该看板已删除 <Link href="http://localhost:6006/?path=/story/components-page--demo">取消订阅</Link>
    </>
  ),
  cta: defaultCTA,
};
export const noShared = Template.bind({});
noShared.args = {
  statusCode: 'noShared',
  description: (
    <>
      此看板已取消与你共享 <Link href="http://localhost:6006/?path=/story/components-page--demo">取消订阅</Link>
    </>
  ),
  cta: defaultCTA,
};
export const NotFound = Template.bind({});
NotFound.args = {
  statusCode: 404,
  description: '抱歉，出现了一个错误，页面不见了',
  cta: defaultCTA,
};

export const InternalServerError = Template.bind({});
InternalServerError.args = {
  statusCode: 500,
  description: '抱歉，服务器出现了错误',
  cta: defaultCTA,
};
