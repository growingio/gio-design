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
  /**
   * 后缀图标宽度
   */
  suffixWidth?: number;
  forwardRef?:
    | React.RefObject<HTMLInputElement>
    | React.MutableRefObject<HTMLInputElement>
    | React.LegacyRef<HTMLInputElement>;
}

export interface InputNumberProps extends Omit<InputProps, 'onChange'> {
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
