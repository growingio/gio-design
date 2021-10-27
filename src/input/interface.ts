import React from 'react';

export type InputSize = 'normal' | 'small';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'suffix'> {
  /**
   * 修改值时触发的回调函数
   */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Input 外层容器 style，
   */
  style?: React.CSSProperties;
  /**
   * input 大小
   * @default 'middle''
   */
  size?: InputSize;
  prefixCls?: string;

  prefix?: React.ReactNode;
  allowClear?: boolean;
  /**
   * input 的后缀图标
   */
  suffix?: React.ReactNode;
  forwardRef?: React.MutableRefObject<HTMLInputElement | null> | ((instance: HTMLInputElement | null) => void) | null;
}

export interface PasswordProps<T extends InputProps> {
  prefixCls?: string;
}

export interface InputNumberProps<T extends InputProps> {
  prefixCls?: string;
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

export interface InputButtonProps {
  /**
   * Input button 的 class name
   */
  className?: string;
  /**
   * 外层容器 style，取代 wrapStyle 并忽略 inputStyle
   */
  style?: React.CSSProperties;
  /**
   * 外层容器的style
   */
  wrapStyle?: React.CSSProperties;
  /**
   * input 的 style
   */
  inputStyle?: React.CSSProperties;
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

  /**
   * 空值时，显示的样式
   */
  placeholder?: string;
  /**
   * 当Input Button的值修改后的方法
   */
  onInputChange?: (value: string) => void;
  forwardRef?:
    | React.RefObject<HTMLInputElement>
    | React.MutableRefObject<HTMLInputElement>
    | React.LegacyRef<HTMLInputElement>;
}
