export interface SearchBarProps {
  /**
   * 是否需要展示搜索记录
   * @default false
   */
  showStorage?: boolean;
  /**
   * 默认显示最近搜索条数
   * @default 5
   */
  storageNum?: number;
  /**
   * 是否显示清除本地存储按钮
   * @default false
   */
  allowClearStorage?: boolean;
  /**
   * 是否显示清空内容按钮
   * @default false
   */
  showClear?: boolean;
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean;
  /**
   * input大小
   * @default "middle"
   */
  size?: 'large' | 'middle' | 'small';
  /**
   * input样式
   */
  inputStyle?: React.CSSProperties;
  /**
   * input 组件外层容器的 style
   */
  inputWrapStyle?: React.CSSProperties;
  /**
   * searchbar 组件外层容器的 style
   */
  wrapStyle?: React.CSSProperties;
  /**
   * input placeholder
   */
  placeholder?: string;
  /**
   * 值
   */
  value: string;
  /**
   * 修改值时触发的回调函数
   */
  onChange: (value: string) => void;
  /**
   * 存储记录的唯一 id
   */
  id: string;
}
