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
   * Input 外层容器 style，
   */
  style?: React.CSSProperties;
  /**
   * input 大小
   * @default 'middle''
   */
  size?: 'large' | 'middle' | 'small';
  prefix?: React.ReactNode;
  prefixWidth?: number;
  /**
   * input 的后缀图标
   */
  suffix?: React.ReactNode;
  suffixWidth?: number;
  forwardRef?: React.MutableRefObject<HTMLInputElement | null> | ((instance: HTMLInputElement | null) => void) | null;
}

export interface ICustomDisplay {
  formatter: (value: number | string | undefined) => string;
  parser: (value: string | undefined) => number | string;
}

export type PossibleValueType = number | string | undefined | null;
export interface InputNumberProps extends Omit<InputProps, 'value' | 'onChange'> {
  /**
   * 输入框允许的最大值
   */
  max?: number;
  /**
   * 输入框允许的最小值
   */
  min?: number;
  /**
   * 小数点分隔符
   */
  decimalSeparator?: string;
  /**
   * 数字输入框 value 类型限定为诶 number
   */
  value: number;
  /**
   * 修改值时触发的回调函数
   */
  onChange: (value: PossibleValueType) => void;
  /**
   * 自定义在 InputNumber 中文文本的显示格式
   * 但最终 onChange 返回的数据依旧会是 number 类型
   */
  customDisplay?: ICustomDisplay;
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
  /**
   * 是否展示计数
   */
  showCount?: boolean;
  forwardRef?:
    | React.RefObject<HTMLTextAreaElement>
    | React.MutableRefObject<HTMLTextAreaElement>
    | React.LegacyRef<HTMLTextAreaElement>;
}
