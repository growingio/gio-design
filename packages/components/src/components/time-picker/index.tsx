import * as React from 'react';
import 'antd/lib/time-picker/style/index.css';
import './index.less';

import { TimePicker as AntdTimePicker } from 'antd';
export interface TimePickerProps {
  placementIcon?: 'left' | 'right';
  className?: string;
  [key: string]: any;
}

const TimePicker: React.SFC<TimePickerProps> = ({ placementIcon = 'right', className, ...other }) => (
  <AntdTimePicker className={`${'gio-timerPicker-icon' + placementIcon} ${className}`} {...other} />
);

export default TimePicker;
