export type RadioValueType = string | number;

export interface IRadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'type' | 'disabled'> {
  /**
   初始是否选中
   */
  defaultChecked?: boolean;
  /**
     自定义 `CSS` 类前缀
     */
  prefixCls?: string;
  /**
   指定当前是否选中
   */
  checked?: boolean;
  /**
   子元素
   */
  children?: React.ReactNode;
  /**
   变化时回调函数
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  // 自定义 `className`
  className?: string;
  // 自定义样式
  style?: React.CSSProperties;
  // 选择框填充后的背景色
  color?: string;
  // 是否失效
  disabled?: boolean;
  // 选项对应的值
  value?: RadioValueType;
}

export interface TRadioGroupOption {
  value: RadioValueType;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface IRadioGroupProps {
  // 自定义 `className`
  className?: string;
  // 自定义样式
  style?: React.CSSProperties;
  // `RadioGroup` 的排列方向为水平还是垂直
  layout?: 'horizontal' | 'vertical';
  // 整组失效
  disabled?: boolean;
  // 默认选中的选项
  defaultValue?: RadioValueType;
  // 指定选中的选项
  value?: RadioValueType;
  // 变化时回调函数
  onChange?: IRadioProps['onChange'];
  // 指定可选项
  options?: Array<TRadioGroupOption | string>;
  // 子元素
  children?: React.ReactNode;
}

export interface RadioGroupContextType extends Pick<TRadioGroupOption, 'value' | 'disabled'> {
  name?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}
