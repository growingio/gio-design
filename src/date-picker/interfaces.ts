import React from 'react';
import { CommonProps } from '@gio-design/utils';
import { PopoverProps } from '../popover';
import { StaticDatePickerProps } from '../static-date-picker';
import { InputButtonProps } from '../input';

export interface DatePickerProps
  extends CommonProps,
  Omit<InputButtonProps, 'value' | 'onSelect' | 'defaultValue'>,
  Omit<StaticDatePickerProps, 'onSelect'>,
  Omit<PopoverProps, 'trigger' | 'placement' | 'prefixCls' | 'children' | 'content'> {
  /**
   * 自定义的触发器
   */
  trigger?: React.ReactNode;
  /**
   * 日期展示格式
   * @see https://date-fns.org/v2.25.0/docs/fp/format
   * @default `YYYY/MM/dd`
   */
  format?: string;
  /**
   *选中的回掉
   */
  onSelect?: (date: Date, dateString: string) => void;
  dataTestId?: string;
}
