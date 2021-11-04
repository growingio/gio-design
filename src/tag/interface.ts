export interface TagProps {
  /**
   * 类型
   * @default 'normal'
   */
  type?: 'normal' | 'highlight';
  /**
   * 状态
   */
  status?: 'success' | 'warning' | 'error' | 'offline' | 'draft';
  /**
   * 大小
   * @default 'large'
   */
  size?: 'small' | 'middle';
  /**
   * 显示可关闭图标
   * @default false
   */
  closable?: boolean;
  /**
   * 失效
   * @default false
   */
  disabled?: boolean;
  /**
   * 关闭图标是否由 hover 触发
   * @default false
   */
  persistCloseIcon?: boolean;
  /**
   * 点击关闭图标的回调
   */
  onClose?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  customizePrefixCls?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
