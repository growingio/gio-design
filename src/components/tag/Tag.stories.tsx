import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Docs from './Tag.mdx';
import { TagProps } from './interface';
import Tag from './index';
import './style';

export default {
  title: 'Basic Components/Tag',
  component: Tag,
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta;

const DefaultTemplate: Story<TagProps> = (args) => (
  <>
    <Tag className="tag_website_demo_tag" {...args}>
      超管
    </Tag>
    <Tag className="tag_website_demo_tag" status="success" {...args}>
      已上线
    </Tag>
    <Tag className="tag_website_demo_tag" status="warning" {...args}>
      待上线
    </Tag>
    <Tag className="tag_website_demo_tag" status="draft" {...args}>
      草稿
    </Tag>
    <Tag className="tag_website_demo_tag" status="offline" {...args}>
      已结束
    </Tag>
    <br />
    <br />
    <Tag className="tag_website_demo_tag" {...args} status="success" type="prorupt" size="middle">
      正常
    </Tag>
    <Tag className="tag_website_demo_tag" {...args} status="warning" type="prorupt" size="middle">
      不确定
    </Tag>
    <Tag className="tag_website_demo_tag" {...args} status="error" type="prorupt" size="middle">
      错误
    </Tag>
    <br />
    <br />
    <Tag className="tag_website_demo_tag" {...args} color="beta" size="small">
      Beta
    </Tag>
    <Tag className="tag_website_demo_tag" {...args} color="new" size="small">
      New
    </Tag>
    <Tag className="tag_website_demo_tag" {...args} color="grayscale" size="small">
      灰度
    </Tag>
  </>
);

export const Default = DefaultTemplate.bind({});

const DelayTemplate: Story<TagProps> = (args) => {
  return (
    <>
      <Tag className="tag_website_demo_tag" {...args}>
        控件内的过滤条件
      </Tag>
      <Tag className="tag_website_demo_tag" {...args} type="prorupt">
        控件内的过滤条件
      </Tag>
      <br />
      <br />
      <Tag className="tag_website_demo_tag" {...args} persistCloseIcon={false}>
        可删除的标签
      </Tag>
    </>
  );
};
export const Closable = DelayTemplate.bind({});
Closable.args = {
  closable: true,
  persistCloseIcon: true,
};
