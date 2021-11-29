import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { HomeFilled } from '@gio-design/icons';
import { action } from '@storybook/addon-actions';
import Docs from './AvatarPage';
import Avatar, { AvatarGroup, AvatarGroupProps, AvatarProps } from '../index';
import '../style';
import '../style/demo.stories.less';
import image from '../../assets/images/Avatar.png';

export default {
  title: 'Upgraded/Avatar',
  component: Avatar,
  parameters: {
    docs: {
      page: Docs,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=4092%3A41169',
      allowFullscreen: true,
    },
  },
  argTypes: {
    icon: {
      type: { name: 'string' },
    },
  },
} as Meta;
const arr = ['small', 'medium', 'large', 'x-large'];
const Template: Story<AvatarProps> = (args) => (
  <>
    <table className="table-demo">
      <tr>
        <th>Control</th>
        <th>small</th>
        <th>medium</th>
        <th>large</th>
        <th>x-large</th>
      </tr>
      <tr>
        <td>default</td>
        {arr.map((item: AvatarProps['size']) => (
          <td>
            <Avatar {...args} size={item} />
          </td>
        ))}
      </tr>
      <tr>
        <td>字符</td>
        {arr.map((item: AvatarProps['size']) => (
          <td>
            <Avatar {...args} size={item}>
              Lili
            </Avatar>
          </td>
        ))}
      </tr>
      <tr>
        <td>icon</td>
        {arr.map((item: AvatarProps['size']) => (
          <td>
            <Avatar icon={<HomeFilled />} {...args} size={item} />
          </td>
        ))}
      </tr>
      <tr>
        <td>image</td>
        {arr.map((item: AvatarProps['size']) => (
          <td>
            <Avatar src={image} {...args} size={item} />
          </td>
        ))}
      </tr>
      <tr>
        <td>hover</td>
        {arr.map((item: AvatarProps['size']) => (
          <td>
            <Avatar {...args} size={item} droppable />
          </td>
        ))}
      </tr>
      <tr>
        <td>square</td>
        {arr.map((item: AvatarProps['size']) => (
          <td>
            <Avatar {...args} size={item} droppable mode="square" />
          </td>
        ))}
      </tr>
    </table>
    <table className="table-demo">
      <tr>
        <th>control</th>
        <th>example</th>
      </tr>
      <tr>
        <td>AvatarGroup</td>
        <td>
          <AvatarGroup
            {...{
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
            }}
          />
        </td>
      </tr>
    </table>
  </>
);

export const Demo = Template.bind({});
Demo.args = {
  droppable: false,
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
      <Avatar size="medium" src={image} {...args}>
        李
      </Avatar>
      <Avatar size="large" src={image} {...args}>
        李
      </Avatar>
      <Avatar size="x-large" src={image} {...args}>
        李
      </Avatar>
    </div>
    <br />
    <div className="size-display">
      <Avatar size="small" {...args}>
        李
      </Avatar>
      <Avatar size="medium" {...args}>
        李
      </Avatar>
      <Avatar size="large" {...args}>
        李
      </Avatar>
      <Avatar size="x-large" {...args}>
        李
      </Avatar>
    </div>
  </>
);
export const Size = SizeTemplate.bind({});

const DefaultTemplate: Story<AvatarProps> = (args) => (
  <>
    <Avatar {...args} />
  </>
);
export const Default = DefaultTemplate.bind({});
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
  onChange: action('action'),
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
