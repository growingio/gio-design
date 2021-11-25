import React from 'react';
import { CommonProps } from '@gio-design/utils';
import { PopoverProps } from '../popover';
import { StaticDateRangePickerProps } from '../static-date-range-picker';
import { InputButtonProps } from '../input';

export type NullableDate = Date | undefined;
export type NullableString = string | undefined;

export interface DateRangePickerProps
  extends CommonProps,
    Omit<InputButtonProps, 'value' | 'onSelect' | 'defaultValue'>,
    Omit<StaticDateRangePickerProps, 'onSelect' | 'value' | 'defaultValue'>,
    Omit<PopoverProps, 'trigger' | 'placement' | 'prefixCls' | 'children' | 'content'> {
  /**
   * 自定义的触发器
   */
  trigger?: React.ReactElement;
  /**
   * 日期展示格式
   * @see https://date-fns.org/v2.25.0/docs/fp/format
   * @default `YYYY/MM/dd`
   */
  format?: string;
  /**
   * 选择日期时的回调
   *
   * @param dates - 选择的日期 `[Date, Date]`
   * @param dateStrings - 格式化后的日期 `[string, string]`
   */
  onSelect?: (dates: [NullableDate, NullableDate], dateStrings: NullableString) => void;
  /**
   * 选择的日期
   */
  value?: [NullableDate, NullableDate];
  defaultValue?: [NullableDate, NullableDate];
}
