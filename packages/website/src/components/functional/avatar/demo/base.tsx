import React from 'react';
import { Avatar } from '@gio-design/components';
import '@gio-design/components/es/components/avatar/style/index.css';
import image from './Avatar.png';
import './index.less';

export default () => (
  <div className="display-avatar">
    <Avatar src={image}>li</Avatar>
    <Avatar>li</Avatar>
    <Avatar>这是一个很长的描述</Avatar>
    <Avatar src="错误的链接">这是一个很长的描述</Avatar>
  </div>
);
