import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { HomeFilled } from '@gio-design/icons';
import Docs from './Avatar.mdx';
import Avatar, { AvatarGroup, AvatarGroupProps, AvatarProps } from './index';
import './style';
import './style/demo.stories.less';
import image from '../../assets/images/Avatar.png';

export default {
  title: 'Functional Components/Avatar',
  component: Avatar,
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta;

const Template: Story<AvatarProps> = (args) => (
  <div className="display-avatar">
    <Avatar src={image} {...args}>
      li
    </Avatar>
    <Avatar {...args}>li</Avatar>
    <Avatar {...args}>这是一个很长的描述</Avatar>
    <Avatar src="错误的链接" {...args}>
      这是一个很长的描述
    </Avatar>
    <Avatar {...args} icon={<HomeFilled />} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  droppable: false,
  size: 'default',
  omit: true,
  placement: 'top',
  displayTooltip: true,
  tooltipTitle: 'li',
};

const SizeTemplate: Story<AvatarProps> = (args) => (
  <>
    <div className="size-display">
      <Avatar size="small" src={image} {...args}>
        李
      </Avatar>
      <Avatar size="default" src={image} {...args}>
        李
      </Avatar>
      <Avatar size="large" src={image} {...args}>
        李
      </Avatar>
      <Avatar size="huge" src={image} {...args}>
        李
      </Avatar>
    </div>
    <br />
    <div className="size-display">
      <Avatar size="small" {...args}>
        李
      </Avatar>
      <Avatar size="default" {...args}>
        李
      </Avatar>
      <Avatar size="large" {...args}>
        李
      </Avatar>
      <Avatar size="huge" {...args}>
        李
      </Avatar>
    </div>
  </>
);
export const Size = SizeTemplate.bind({});

const HoverTemplate: Story<AvatarProps> = (args) => (
  <>
    <Avatar src={image} {...args} />
    <Avatar {...args} />
    <Avatar {...args}>张</Avatar>
    <Avatar {...args} icon={<HomeFilled />} />
  </>
);
export const Hover = HoverTemplate.bind({});
Hover.args = {
  droppable: true,
};

const GroupTempalte: Story<AvatarGroupProps> = (args) => <AvatarGroup {...args} />;

export const Group = GroupTempalte.bind({});
Group.args = {
  number: 4,
  placement: 'bottom',
  displayTooltip: true,
  users: [
    {
      name: 'li',
      src: image,
      tooltipTitle: '这是li',
    },
    {
      name: 'pan',
    },
    {
      name: 'leng',
      src: image,
    },
    {
      name: 'liu',
    },
    {
      name: 'wang',
      src: image,
    },
    {
      name: 'tong',
      src: image,
    },
  ],
};
