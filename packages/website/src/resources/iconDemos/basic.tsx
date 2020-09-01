import React from 'react';
import { AppOutlined, AppsFilled, CalendarOutlined, LoadingBlackOutlined } from '@gio-design/icons';
import './basic.less';

export default () => (
  <div className="icon-list">
    <AppOutlined />
    <AppsFilled color="red" />
    <CalendarOutlined />
    <LoadingBlackOutlined rotating />
  </div>
);
