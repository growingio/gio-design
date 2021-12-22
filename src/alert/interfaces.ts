export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   指定警告提示的样式
   */
  type?: 'success' | 'info' | 'warning' | 'error';
  /**
   是否显示关闭按钮
   */
  closeable?: boolean;
  /**
   警告提示的辅助性文字介绍
   */
  description?: React.ReactNode;
  /**
   警告提示内容
   */
  message?: React.ReactNode;
  /**
   是否显示辅助图标
   */
  showIcon?: boolean;
  /**
   自定义图标，showIcon 为 true 时有效
   */
  icon?: React.ReactNode;
  /**
   关闭时触发的回调函数
   */
  onClose?: () => void;
}
