import React from 'react';
import { StopWatchOutlined, CloseCircleFilled } from '@gio-design/icons';
import TimePicker from './TimePicker';
import { TimePickerProps } from './interface';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';

export { TimePickerProps } from './interface';

export default ({ prefixCls: customizePrefixCls, ...props }: TimePickerProps) => {
  const prefixCls = usePrefixCls('time-picker', customizePrefixCls);

  return (
    <>
      <TimePicker
        prefixCls={prefixCls}
        inputIcon={<StopWatchOutlined color="#5C4E61" />}
        clearIcon={<CloseCircleFilled color="#5C4E61" />}
        {...props}
      />
    </>
  );
};
