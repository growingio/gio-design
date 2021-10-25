import React from 'react';

export type InputSize = 'normal' | 'small';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'suffix'> {
  /**
   * 修改值时触发的回调函数
   */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * 按下回车时的回调
   */
  onPressEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  compositionStart?: (e: React.CompositionEvent<HTMLInputElement>) => void;
  compositionUpdate?: (e: React.CompositionEvent<HTMLInputElement>) => void;
  compositionEnd?: (e: React.CompositionEvent<HTMLInputElement>) => void;
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
  prefixWidth?: number;
  allowClear?: boolean;
  /**
   * input 的后缀图标
   */
  suffix?: React.ReactNode;
  suffixWidth?: number;
  forwardRef?: React.MutableRefObject<HTMLInputElement | null> | ((instance: HTMLInputElement | null) => void) | null;
}

export interface CompoundedInput
  extends React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>> {
  InputNumber: React.FC<InputNumberProps>;
  Password: React.FC<PasswordProps>;
  TextArea: React.FC<TextAreaProps>;
}

export interface PasswordProps extends Omit<InputProps, 'type'> {
  prefixCls?: string;
}

export interface InputNumberProps extends Omit<InputProps, 'type'> {
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
  /**
   * 是否展示计数
   */
  showCount?: boolean;
  forwardRef?:
    | React.RefObject<HTMLTextAreaElement>
    | React.MutableRefObject<HTMLTextAreaElement>
    | React.LegacyRef<HTMLTextAreaElement>;
}
