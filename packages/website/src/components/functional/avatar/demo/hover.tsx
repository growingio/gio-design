import React from 'react';
import { Avatar } from '@gio-design/components';
import '@gio-design/components/es/components/avatar/style/index.css';
import image from './Avatar.png';

export default () => <Avatar src={image} droppable={true} />;
