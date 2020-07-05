/**
 * title: Avatar 仅展示
 * desc: 当用户未设置头像时，显示该用户名称的首个文字或大写字母。
 */
import React from 'react';
import { Avatar } from '@gio-design/components';
import '@gio-design/components/es/components/avatar/style/index.css';
import image from './icon.png';
import './index.less';

export default () => (
  <>
    <Avatar src={image}>li</Avatar>
    <Avatar>li</Avatar>
    <Avatar omit={false}>li</Avatar>
    <Avatar src="错误的链接">这是一个很长的描述</Avatar>
  </>
);
