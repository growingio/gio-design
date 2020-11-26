import { ReactNode } from 'react';

export interface BannerProps {
  /**
   横幅的类型
   */
  type?: 'normal' | 'alert';
  /**
   横幅内的内容
   */
  content?: string | ReactNode;
  /**
   是否可以关闭
   */
  closeable?: boolean;
  /**
   点击关闭横幅的回掉函数
   */
  onClose?: () => void;
  /**
   横幅内自定义 `button`
   */
  button?: ReactNode;
  /**
   自定义 `css` 类前缀
   */
  prefixCls?: string;
}
