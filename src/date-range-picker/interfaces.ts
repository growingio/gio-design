import React from 'react';
import { CommonProps } from '@gio-design/utils';
import { PopoverProps } from '../popover';

export type NullableDate = Date | undefined;
export type NullableString = string | undefined;

export interface DateRangePickerProps
  extends CommonProps {
  /**
   * onVisibleChange
   */
  onVisibleChange?: (visible: boolean) => void;
  /**
   * overlayClassName,popoverClassName
   */
  overlayClassName?:string;
  /**
   * visible 触发器开关值
   */
  visible?: boolean;
  /**
   * disabled 触发器禁用
   */
  disabled?:boolean;
  /**
   * disabledDate
   */
  disabledDate?:(date:Date)=>boolean;
  /**
   * placeholder value为空时展示
   */
  placeholder?:string;
  /**
   * 允许删除
   */
  allowClear?:boolean;
  /**
   * prefix inputButton 前缀
   */
  prefix?: React.ReactNode;
  /**
   * suffix inputButton 后缀
   */
  suffix?: React.ReactNode;
  /**
   * 触发器大小
   */
  size?:'normal' | 'small'
  /**
   * 清除时调用的函数，与allowClear 一起使用
   */
  onClear?:(e?: React.MouseEvent<Element, MouseEvent>) => void;
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
  /**
   * 默认时间
   */
  defaultValue?: [NullableDate, NullableDate];
  /**
   * 测试Id
   */
  dataTestId?: string;
  PopoverProps?:Omit<PopoverProps, 'trigger' | 'placement' | 'prefixCls' | 'children' | 'content'>;
}
