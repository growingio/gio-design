/**
 * title: Avatar 可展开操作
 * desc: hover头像显示icon，click头像展开下来菜单（等Dropdown设计与实现完成再添加该功能）
 */
import React from 'react';
import { Avatar } from '@gio-design/components';
import '@gio-design/components/es/components/avatar/style/index.css';
import image from './icon.png';

export default () => <Avatar src={image} droppable={true} />;
