import React from 'react';

export type InputSize = 'normal' | 'small';

export interface BaseInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'suffix'> {
  /**
   * Input 外层容器 style，
   */
  style?: React.CSSProperties;
  /**
   * input 大小
   * @default "normal"
   */
  size?: InputSize;
  prefix?: React.ReactNode;

  prefixCls?: string;
  /**
   * input 的后缀图标
   */
  suffix?: React.ReactNode;
}

export interface InputProps extends Omit<BaseInputProps, 'onChange'> {
  /**
   * 修改值时触发的回调函数
   */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPressEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;

  allowClear?: boolean;

  forwardRef?: React.MutableRefObject<HTMLInputElement | null> | ((instance: HTMLInputElement | null) => void) | null;
}

export interface PasswordProps extends Omit<BaseInputProps, 'type'> {
  forwardRef?: React.MutableRefObject<HTMLInputElement | null> | ((instance: HTMLInputElement | null) => void) | null;
}

export interface InputNumberProps extends Omit<BaseInputProps, 'type'> {
  forwardRef?: React.MutableRefObject<HTMLInputElement | null> | ((instance: HTMLInputElement | null) => void) | null;
}

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * 是否可拖动大小
   * @default false
   */
  resize?: boolean;
  /**
   * 是否根据内容自动调整高度
   * @default false
   */
  autosize?: boolean;
  allowClear?: boolean;
  /**
   * 外层容器 style，取代 wrapStyle 并忽略 inputStyle
   */
  style?: React.CSSProperties;
  prefixCls?: string;
  /**
   * 外层容器的style
   */
  wrapStyle?: React.CSSProperties;
  /**
   * input 的 style
   */
  inputStyle?: React.CSSProperties;

  forwardRef?:
    | React.RefObject<HTMLTextAreaElement>
    | React.MutableRefObject<HTMLTextAreaElement>
    | React.LegacyRef<HTMLTextAreaElement>;
}

export interface InputButtonProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'suffix'> {
  /**
   * Input button 的 class name
   */
  className?: string;
  /**
   * 外层容器 style，取代 wrapStyle 并忽略 inputStyle
   */
  style?: React.CSSProperties;
  /**
   * class name 前缀
   */
  prefixCls?: string;
  /**
   * 是否disabled掉Input Button
   */
  disabled?: boolean;

  /**
   * 是否可以被清空
   */
  allowClear?: boolean;

  /**
   * 是否隐藏前缀的icon，默认是false
   */
  hidePrefix?: boolean;
  /**
   * 自定义前缀icon
   */
  prefix?: React.ReactNode;
  /**
   * 自定义后缀的icon
   */
  suffix?: React.ReactNode;

  /**
   * Input button默认的value
   */
  value?: string;

  maxWidth?: number;

  /**
   * Input Button size
   */
  size?: InputSize;

  /**
   * 空值时，显示的样式
   */
  placeholder?: string;

  /**
   * 设置是否active
   * @default false
   */
  active?: boolean;
  /**
   * 当Input Button的值修改后的方法
   */
  onInputChange?: (value: string) => void;
  /**
   * 点击onClear回调
   *
   */
  onClear?: (e?: React.MouseEvent<Element, MouseEvent>) => void;
  forwardRef?: React.MutableRefObject<HTMLInputElement | null> | ((instance: HTMLInputElement | null) => void) | null;
}
