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
  /**
   * Input 的前缀图标
   */
  prefix?: React.ReactNode;

  prefixCls?: string;
  /**
   * input 的后缀图标
   */
  suffix?: React.ReactNode;

  /**
   * 当点击回车键时调用
   */
  onPressEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  /**
   * input 标签的 [ref](https://reactjs.org/docs/refs-and-the-dom.html#gatsby-focus-wrapper)
   */
  inputRef?: React.Ref<HTMLInputElement>;
}

export interface InputProps extends Omit<BaseInputProps, 'onChange'> {
  /**
   * 修改值时触发的回调函数
   */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export type PasswordProps = Omit<BaseInputProps, 'type'>;

export type InputNumberProps = Omit<BaseInputProps, 'type'>;

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
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
}

export interface InputButtonProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'suffix' | 'onChange'> {
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
   * @default false
   */
  allowClear?: boolean;

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
   * 设置 Input Button 的最大宽度
   */
  maxWidth?: number;

  /**
   * Input Button size
   * @default normal
   */
  size?: InputSize;

  /**
   * 空值时，显示的样式
   */
  placeholder?: string;

  /**
   * 设置是否 active
   * @default false
   */
  active?: boolean;
  /**
   * 当Input Button的值修改后的方法
   */
  onChange?: (value?: string) => void;

  /**
   * onChange 的别名，作用跟 onChange 一样
   */
  onInputChange?: (value?: string) => void;

  /**
   * 点击右侧清除按钮的回调函数
   *
   */
  onClear?: (e?: React.MouseEvent<Element, MouseEvent>) => void;
}
