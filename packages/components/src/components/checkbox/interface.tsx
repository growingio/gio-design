export type CheckboxValueType = string | number | boolean;

export interface CheckboxOptionType<T> {
  label: React.ReactNode;
  value: T;
  disabled?: boolean;
  onChange?: CheckboxProps['onChange'];
}

export interface CheckboxGroupProps<T extends CheckboxValueType> {
  /**
   默认选中的选项
   */
  defaultValue?: T[];
  /**
   整组失效
   */
  disabled?: boolean;
  /**
   `CheckboxGroup` 下所有 `input[type="checkbox"]` 的 `name` 属性
   */
  name?: string;
  /**
   指定选中的选项
   */
  value?: T[];
  /**
   变化时的回调函数
   */
  onChange?: (value: T[]) => void;
  /**
   指定可选项
   */
  options?: Array<CheckboxOptionType<T>>;
  /**
   自定义的`CSS`样式
   */
  style?: React.CSSProperties;
  /**
   排列的方向
   */
  direction?: 'horizontal' | 'vertical';
  /**
   子元素
   */
  children?: React.ReactNode | React.ReactNode[];
  /**
   自定义 `CSS` 类前缀
   */
  prefixCls?: string;
}

export interface CheckboxProps {
  /**
   是否部分选中
   */
  indeterminate?: boolean;
  /**
   自定义 `CSS` 类前缀
   */
  prefixCls?: string;
  /**
   自定义 className
   */
  className?: string;
  /**
   初始是否选中
   */
  defaultChecked?: boolean;
  /**
   指定当前是否选中
   */
  checked?: boolean;
  /**
   是否禁止
   */
  disabled?: boolean;
  /**
   变化时的回调函数
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /**
   点击时的回调函数
   */
  onClick?: React.MouseEventHandler<HTMLElement>;
  /**
   指定的选中项
   */
  value?: any;
  children?: React.ReactNode;
  /**
   input[type="checkbox"] 的 id 属性
   */
  id?: string;
  /**
   input[type="checkbox"] 的 name 属性
   */
  name?: string;
  /**
   自定义的`CSS`样式
   */
  style?: React.CSSProperties;
}
