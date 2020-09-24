import React from 'react';
import { AppOutlined, AppsFilled, CalendarOutlined, LoadingOutlined } from '@gio-design/icons';
import './basic.less';

export default () => (
  <div className="icon-list">
    <AppOutlined />
    <AppsFilled color="red" />
    <CalendarOutlined />
    <LoadingOutlined rotating />
  </div>
);
