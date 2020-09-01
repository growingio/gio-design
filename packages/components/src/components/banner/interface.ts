import { ReactNode } from 'react';

export interface BannerProps {
  type?: 'normal' | 'alert';
  content?: string | ReactNode;
  closeable?: boolean;
  onClose?: () => void;
  button?: ReactNode;
  prefixCls?: string;
}
