export interface TagProps {
  type?: 'normal' | 'prorupt';
  status?: 'success' | 'warning' | 'error' | 'offline' | 'draft';
  size?: 'small' | 'medium' | 'large';
  color?: 'beta' | 'new' | 'grayscale' | 'blue';
  closable?: boolean;
  disabled?: boolean;
  persistCloseIcon?: boolean;
  onClose?: (e: React.MouseEvent<SVGElement>) => void;
  customizePrefixCls?: string;
}
