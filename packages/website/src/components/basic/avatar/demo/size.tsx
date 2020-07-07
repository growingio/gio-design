/**
 * title: Avatar 基本用法
 * desc: 头像有四种尺寸可选，分别为24px, 32px, 56px, 80px，默认为32px。
 */
import React from 'react';
import { Avatar } from '@gio-design/components';
import '@gio-design/components/es/components/avatar/style/index.css';
import image from './Avatar.png';

export default () => (
  <>
    <div className="size-display">
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
    </div>

    <br />
    <div className="size-display">
      <Avatar size="small">李</Avatar>
      <Avatar size="default">李</Avatar>
      <Avatar size="large">李</Avatar>
      <Avatar size="huge">李</Avatar>
    </div>
  </>
);
