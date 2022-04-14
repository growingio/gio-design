import React from 'react';
import { CommonProps } from '@gio-design/utils';
import { PopoverProps } from '../popover';
import { InputButtonProps } from '../input';

export interface DatePickerProps
  extends CommonProps ,Pick<InputButtonProps, 'suffix'| 'prefix' | 'onClear' | 'size'>{
  /**
   * visibleChange 调用
   */
  onVisibleChange?: (visible: boolean) => void;
  /**
   * visibleChange 调用
   */
  overlayClassName?: string;
  /**
   * visible 面板设置
   */
  visible?: boolean;
  /**
   * 禁用触发器
   */
  disabled?:boolean;
  /**
   * Date 类型的value
   */
  value?:Date;
  /**
   * defaultValue，value为undefined时，defaultValue生效
   */
  defaultValue?:Date;
  /**
   * disabledDate
   */
  disabledDate?:(date: Date) => boolean;
  /**
   * placeholder
   */
  placeholder?:string;
  /**
   * 允许清除
   */
  allowClear?:boolean;
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
  /**
   *测试Id
   */
  dataTestId?: string;
  /**
   * Popover参数
   */
  PopoverProps?:Omit<PopoverProps, 'trigger' | 'placement' | 'prefixCls' | 'children' | 'content'>;
}
