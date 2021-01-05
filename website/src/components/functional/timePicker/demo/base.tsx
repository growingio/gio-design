import React from 'react';
import { TimePicker } from '@gio-design/components';
import '@gio-design/components/es/components/time-picker/style/index.css';

export default () => {
  return <TimePicker format="HH:mm" placeholder="请选择时间" showSecond={false} onChange={console.log} />;
};
