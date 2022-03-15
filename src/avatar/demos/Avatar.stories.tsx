import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { AppOutlined, EditOutlined, SettingOutlined, UserOutlined } from '@gio-design/icons';
import Docs from './AvatarPage';
import Avatar, { AvatarProps } from '../index';
import '../style';
import Dropdown from '../../dropdown';
import { List } from '../..';

export default {
  title: 'Upgraded/Avatar',
  component: Avatar,
  subcomponents: {
    'Avatar.Group': Avatar.Group,
  },
  parameters: {
    docs: {
      page: Docs,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Design?node-id=6876%3A80615',
      allowFullscreen: true,
    },
  },
} as Meta;

export const Default: Story<AvatarProps> = (args) => <Avatar {...args} />;
Default.args = {
  children: 'Jay Chou',
  displayTooltip: false,
  tooltipTitle: 'Jay Chou',
  droppable: false,
  mode: 'circle',
  omit: true,
  placement: 'bottom',
  size: 'medium',
  backgroundColor: 'pink',
};
Default.argTypes = {
  backgroundColor: {
    control: 'color',
  },
};

export const ImageAvatars = () => <Avatar src="https://joeschmoe.io/api/v1/random" />;

export const LetterAvatars = () => (
  <>
    <Avatar>Jay Chou</Avatar>
    <Avatar backgroundColor="rgb(255, 87, 34)">H</Avatar>
    <Avatar omit={false} backgroundColor="rgb(103, 58, 183)">
      Jay
    </Avatar>
  </>
);

export const Tooltip = () => (
  <>
    <Avatar displayTooltip placement="top">
      Jay Chou
    </Avatar>
    <Avatar backgroundColor="rgb(255, 87, 34)" displayTooltip placement="top">
      H
    </Avatar>
    <Avatar
      omit={false}
      tooltipTitle="Jay Chou"
      displayTooltip
      placement="top"
      src="https://joeschmoe.io/api/v1/random"
    />
  </>
);

export const Sizes = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    <Avatar size="small">Jay Chou</Avatar>
    <Avatar size="medium" backgroundColor="rgb(255, 87, 34)">
      H
    </Avatar>
    <Avatar size="large" omit={false} backgroundColor="rgb(103, 58, 183)">
      Jay
    </Avatar>
    <Avatar size="x-large" omit={false} backgroundColor="pink">
      Jack
    </Avatar>
    <Avatar style={{ width: 120, height: 120 }} src="https://joeschmoe.io/api/v1/random" />
  </div>
);

export const IconAvatars = () => (
  <>
    <Avatar icon={<SettingOutlined />} />
    <Avatar icon={<AppOutlined />} backgroundColor="pink" />
    <Avatar icon={<EditOutlined />} backgroundColor="palegoldenrod" />
  </>
);

export const Modes = () => (
  <>
    <Avatar icon={<UserOutlined />} size="large" mode="square" />
    <Avatar icon={<AppOutlined />} size="large" mode="square" />
    <Avatar icon={<EditOutlined />} size="large" mode="square" />
  </>
);

export const Fallbacks = () => (
  <>
    <Avatar src="https://joeschmoe.io/api/v1/random" icon={<EditOutlined />}>
      Jay
    </Avatar>
    <Avatar src="/broken-image.jpeg" icon={<EditOutlined />}>
      Jay
    </Avatar>
    <Avatar src="/broken-image.jpeg">Jay</Avatar>
    <Avatar src="/broken-image.jpeg" />
  </>
);

export const Grouped = () => (
  <>
    <Avatar.Group
      number={4}
      users={[
        { name: 'Jay Chou', backgroundColor: 'purple' },
        { name: 'Michael Jackson', backgroundColor: 'pink' },
        { name: 'JJ Lin', backgroundColor: 'palegoldenrod', icon: <EditOutlined /> },
        { name: 'Jacky Cheung' },
        { name: 'Leon Lai Ming' },
        { name: 'Andy Lau' },
      ]}
    />
  </>
);

export const DropdownAvatars = () => (
  <>
    <Dropdown
      content={
        <List>
          <List.Item value="Info">Info</List.Item>
          <List.Item value="Setting">Setting</List.Item>
          <List.Item value="Logout">Logout</List.Item>
        </List>
      }
    >
      <Avatar size="large" droppable>
        Jay Chou
      </Avatar>
    </Dropdown>
  </>
);
