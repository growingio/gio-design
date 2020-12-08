import * as React from 'react';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'suffix'> {
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
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
   * 外层容器 style，取代 wrapStyle 并忽略 inputStyle
   */
  style?: React.CSSProperties;
  /**
   * input 组件外层容器的 style
   */
  wrapStyle?: React.CSSProperties;
  /**
   * input 的 style
   */
  inputStyle?: React.CSSProperties;
  /**
   * input 大小
   * @default 'medium''
   */
  size?: 'large' | 'middle' | 'small';
  prefix?: React.ReactNode;
  prefixWidth?: number;
  /**
   * input 的后缀图标
   */
  suffix?: React.ReactNode;
  suffixWidth?: number;
  forwardRef?:
    | React.RefObject<HTMLInputElement>
    | React.MutableRefObject<HTMLInputElement>
    | React.LegacyRef<HTMLInputElement>;
}

export interface InputNumberProps extends Omit<InputProps, 'onChange'> {
  /**
   * 输入框允许的最大值
   */
  max?: number;
  /**
   * 输入框允许的最小值
   */
  min?: number;
  /**
   * 修改值时触发的回调函数
   */
  onChange?: (value: string) => void;
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
  forwardRef?:
    | React.RefObject<HTMLTextAreaElement>
    | React.MutableRefObject<HTMLTextAreaElement>
    | React.LegacyRef<HTMLTextAreaElement>;
}
