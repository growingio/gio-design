export type SwitchItemValueType = string | number;

export interface ISwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'type' | 'disabled'> {
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
   内容前缀
   */
  prefix?: React.ReactNode;
  /**
   变化时回调函数
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  // 自定义 `className`
  className?: string;
  // 自定义样式
  style?: React.CSSProperties;
  // 是否失效
  disabled?: boolean;
  // 选项对应的值
  value?: SwitchItemValueType;
}

export interface TSwitchGroupOption {
  value: SwitchItemValueType;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface ISwitchGroupProps {
  // 自定义 `className`
  className?: string;
  // 自定义样式
  style?: React.CSSProperties;
  // 整组失效
  disabled?: boolean;
  // 大小
  size?: 'small' | 'normal';
  // 默认选中的选项
  defaultValue?: SwitchItemValueType;
  // 指定选中的选项
  value?: SwitchItemValueType;
  // 变化时回调函数
  onChange?: ISwitchProps['onChange'];
  // 指定可选项
  options?: Array<TSwitchGroupOption | string>;
  // 子元素
  children?: React.ReactNode;
  dataTestId?: string;
}

export interface SwitchGroupContextType extends Pick<TSwitchGroupOption, 'value' | 'disabled'> {
  name?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}
