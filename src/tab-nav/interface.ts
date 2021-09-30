export interface TabNavProps {
  /**
   * 替代组件的类前缀
   */
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  /**
   * 标签导航按钮样式
   */
  type?: 'block' | 'line';
  /**
   * 标签导航尺寸
   */
  size?: 'large' | 'middle' | 'small' | 'xs';
  /**
   * 标签被点击时的回调
   */
  onTabClick?: (_key: string) => void;
  /**
   * 标签激活改变时的回调
   */
  onChange?: (_key: string) => void;
  /**
   * 初始化选中面板的 key
   */
  defaultActiveKey?: string;
  /**
   * 开启受控模式，当前激活 tab 面板的 key
   */
  activeKey?: string;
}

export interface TabNavItemProps {
  prefixCls?: string;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}
