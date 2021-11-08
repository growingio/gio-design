import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import EmptyPage from './EmptyPage';
import Empty, { EmptyProps } from '../index';

import '../style';

export default {
  title: 'upgraded/Empty',
  component: Empty,
  parameters: {
    docs: {
      page: EmptyPage,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=4093%3A45839',
      allowFullscreen: true,
    },
  },
} as Meta;

const obj: any = {
  empty: '你还没有属于自己的看板，快去新建一个吧',
  'no-data': '你还没有创建内容，快去创建一个吧',
  'no-result': '没有搜索到相关结果',
  'no-find': '当前查询条件下暂无数据',
};

const demoTemplate: Story<EmptyProps> = (args) => (
  <>
    {Object.keys(obj).map((item) => (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          margin: '10px 30px',
        }}
      >
        <Empty {...args} image={item} description={obj[item]} />
        <Empty {...args} size="small" image={item} cta={null} description={obj[item]} />
      </div>
    ))}
  </>
);
const defaultCTA = {
  text: '返回首页',
  onClick: action('Call to Action'),
};
export const Demo = demoTemplate.bind({});
Demo.args = {
  cta: defaultCTA,
  style: {
    display: 'inline-block',
  },
};

const Template: Story<EmptyProps> = (args) => <Empty {...args} />;

export const EmptyDemo = Template.bind({});
EmptyDemo.args = {
  image: 'empty',
  description: '你还没有属于自己的看板，快去新建一个吧',
  cta: {
    text: '新建看板',
    onClick: action('Call to Action'),
  },
};

export const NoData = () => <Empty description="暂无数据" cta={defaultCTA} />;

export const NoResult = () => <Empty image="no-result" description="没有找到相关结果" cta={defaultCTA} />;

export const NoFind = () => <Empty image="no-find" description="没有找到相关结果" cta={defaultCTA} />;
