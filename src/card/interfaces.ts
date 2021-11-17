export interface CardProps {
  /**
   * 卡片标题
   */
  title?: React.ReactNode;
  /**
   * 自定义卡片底部内容
   */
  footer?: React.ReactNode;
  /**
   * 卡片内容
   */
  children?: React.ReactNode;
  /**
   * 不可用状态
   */
  disabled?: boolean;
  /**
   * 卡片是否可点击
   */
  clickable?: boolean;
  /**
   * 点击卡片时的回调函数
   */
  onClick?: () => void;
  /**
   * 自定义className前缀
   */
  prefixCls?: string;
  /**
   * 自定义className
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
}

export interface CardMetaProps {
  /**
   * 	标题内容
   */
  title?: React.ReactNode;
  /**
   * 	描述内容
   */
  description?: React.ReactNode;
  /**
   * 	头像/图标
   */
  image?: React.ReactElement | string;
  /**
   * 头部后缀
   */
  action?: React.ReactElement;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
