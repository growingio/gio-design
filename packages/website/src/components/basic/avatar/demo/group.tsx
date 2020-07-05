/**
 * title: Avatar 重叠展示
 * desc: 可设置组显示数量，默认为4。<br>
 *  当用户未设置头像时，显示该用户名称的首个文字或大写字母。<br>
 *  hover头像时头像前置，并显示tooltip。（tooltip设计与实现后完成再添加该功能）<br>
 *  点击最后一项展开包含其余用户头像的Dropdown（Dropdown设计与实现后完成再添加该功能）
 */

import React from 'react';
import { AvatarGroup } from '@gio-design/components';
import '@gio-design/components/es/components/avatar/style/index.css';
import image from './icon.png';

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
