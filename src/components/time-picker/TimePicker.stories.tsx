import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import TimePicker from './index';
import { TimePickerProps } from './interface';
import './style/index.less';

export default {
  title: 'Components/Functional/TimePicker',
  component: TimePicker,
} as Meta;

export const Default: Story<TimePickerProps> = (args) => <TimePicker {...args} />;

Default.args = {
  format: 'HH:mm:ss',
  placeholder: '请选择时间',
    onChange: console.log,
    clearText: 'clear',
    defaultOpen: false,
    inputReadOnly: false,
    style: {},
    className: '',
    inputClassName: '',
    popupClassName: '',
    popupStyle: {},
    allowEmpty: true,
    showHour: true,
    showMinute: true,
    showSecond: true,
    hideDisabledOptions: false,
    placement: 'bottomLeft',
    use12Hours: false,
    focusOnOpen: false,
};
