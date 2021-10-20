export type CheckboxValueType = string | number;

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'type' | 'disabled'> {
  /**
     是否为不定状态
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
     当前选中值
     */
  value?: CheckboxValueType;
  /**
     是否禁止
     */
  disabled?: boolean;
  /**
     变化时的回调函数
     */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /**
     选择框填充后的背景色
     */
  color?: string;
  /**
     自定义的`CSS`样式
     */
  style?: React.CSSProperties;
}
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
   自定义 `CSS` 类前缀
   */
  prefixCls?: string;
  /**
   自定义子节点
   */
  children?: React.ReactNode;
  /**
   checkbox 排列方向
   */
  layout?: 'horizontal' | 'vertical';
}
