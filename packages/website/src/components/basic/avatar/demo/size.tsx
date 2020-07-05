/**
 * title: Avatar 基本用法
 * desc: 头像有四种尺寸可选，分别为24px, 32px, 56px, 80px，默认为32px。
 */
import React from 'react';
import { Avatar } from '@gio-design/components';
import '@gio-design/components/es/components/avatar/style/index.css';
import image from './icon.png';

export default () => (
  <>
    <Avatar size="small" src={image}>
      李
    </Avatar>
    <Avatar size="default" src={image}>
      李
    </Avatar>
    <Avatar size="large" src={image}>
      李
    </Avatar>
    <Avatar size="huge" src={image}>
      李
    </Avatar>
  </>
);
