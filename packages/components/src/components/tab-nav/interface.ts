export interface TabNavProps {
  /**
   * 替代组件的类前缀
   * @default 'gio-tabnav'
   */
  prefixCls?: string;
  className?: string;
  style?: CSSStyleSheet;
  children?: React.ReactNode;
  /**
   * 标签导航按钮样式
   * @default 'block''
   */
  type?: 'block' | 'line';
  /**
   * 标签导航尺寸
   * @default 'large'
   */
  size?: 'large' | 'middle' | 'small' | 'xs';
  /**
   * 标签被点击时的回调
   */
  onTabClick?: (_key: string | number) => void;
  /**
   * 标签激活改变时的回调
   */
  onChange?: (_key: string | number) => void;
  /**
   * 初始化选中面板的 key
   */
  defaultActiveKey?: string | number;
  /**
   * 开启受控模式，当前激活 tab 面板的 key
   */
  activeKey?: string | number;
}

export interface TabNavItemProps {
  prefixCls?: string;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}
