export interface TagProps {
  /**
   * 类型
   * @default normal
   */
  type?: 'normal' | 'prorupt';
  status?: 'success' | 'warning' | 'error' | 'offline' | 'draft';
  size?: 'small' | 'middle' | 'large';
  color?: 'beta' | 'new' | 'grayscale' | 'blue';
  closable?: boolean;
  disabled?: boolean;
  persistCloseIcon?: boolean;
  onClose?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  customizePrefixCls?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
