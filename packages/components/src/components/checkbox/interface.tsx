export type CheckboxValueType = string | number | boolean;

export interface CheckboxOptionType<T> {
  label: React.ReactNode;
  value: T;
  disabled?: boolean;
  onChange?: CheckboxProps['onChange'];
}

export interface CheckboxGroupProps<T extends CheckboxValueType> {
  defaultValue?: T[];
  disabled?: boolean;
  name?: string;
  value?: T[];
  onChange?: (value: T[]) => void;
  options?: Array<CheckboxOptionType<T>>;
  style?: React.CSSProperties;
  direction?: 'horizontal' | 'vertical';
  children?: React.ReactNode | React.ReactNode[];
  prefixCls?: string;
}

export interface CheckboxProps {
  /**
   * 是否部分选中
   */
  indeterminate?: boolean;
  prefixCls?: string;
  /**
   * 自定义 className
   */
  className?: string;
  /**
   * 初始是否选中
   */
  defaultChecked?: boolean;
  /**
   * 指定当前是否选中
   */
  checked?: boolean;
  /**
   * 是否禁止
   */
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;

  value?: any;
  children?: React.ReactNode;
  id?: string;
  name?: string;
  style?: React.CSSProperties;
}
