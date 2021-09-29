import { Props as RCCheckboxProps } from 'rc-checkbox';

export interface IRadioProps extends Omit<RCCheckboxProps, 'onChange'> {
  /**
   初始是否选中
   */
  defaultChecked?: boolean;
  /**
   指定当前是否选中
   */
  checked?: boolean;
  /**
   鼠标滑入回调函数
   */
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  /**
   鼠标移出回调函数
   */
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
  /**
   子元素
   */
  children?: React.ReactNode;
  /**
   变化时回调函数
   */
  onChange?: (e: IRadioChangeEvent) => void;
}

export interface TRadioGroupOption {
  value: any;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface IRadioGroupProps {
  // 自定义 `className`
  className?: string;
  // 自定义样式
  style?: React.CSSProperties;
  // `RadioGroup` 的排列方向为水平还是垂直
  direction?: 'horizontal' | 'vertical';
  // 整组失效
  disabled?: boolean;
  // 默认选中的选项
  defaultValue?: any;
  // 指定选中的选项
  value?: any;
  // 变化时回调函数
  onChange?: IRadioProps['onChange'];
  // `RadioGroup` 下所有 `input[type="radio"]` 的 `name` 属性
  name?: string;
  // 指定可选项
  options?: Array<TRadioGroupOption | string>;
  // 子元素
  children?: React.ReactNode;
}

export interface IRadioGroupContext extends Pick<TRadioGroupOption, 'value' | 'disabled'> {
  name?: string;
  onChange: (e: IRadioChangeEvent) => void;
}

export interface IRadioChangeEventTarget extends EventTarget {
  value?: any;
}

export interface IRadioChangeEvent extends Event {
  target: IRadioChangeEventTarget;
}
