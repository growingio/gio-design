import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { TagProps } from './interface';
import Tag from './index';
import './style';

export default {
  title: 'Components/Basic/Tag',
  component: Tag,
} as Meta;

const Template: Story<TagProps> = (args) => (
  <>
    <Tag className="tag_website_demo_tag" size="small" {...args}>
      超管
    </Tag>
    <Tag className="tag_website_demo_tag" status="success" size="small" {...args}>
      已上线
    </Tag>
    <Tag className="tag_website_demo_tag" status="warning" size="small" {...args}>
      待上线
    </Tag>
    <Tag className="tag_website_demo_tag" status="draft" size="small" {...args}>
      草稿
    </Tag>
    <Tag className="tag_website_demo_tag" status="offline" size="small" {...args}>
      已结束
    </Tag>
  </>
);

export const Default = Template.bind({});
