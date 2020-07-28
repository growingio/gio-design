import React from 'react';
import { AvatarGroup } from '@gio-design/components';
import '@gio-design/components/es/components/avatar/style/index.css';
import image from './Avatar.png';

export default () => {
  const users = [
    {
      name: 'li',
      src: image,
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
  ];
  return <AvatarGroup users={users} />;
};
