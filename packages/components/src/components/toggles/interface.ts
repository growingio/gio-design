export interface TogglesProps {
  /**
   `switch` 的文字描述
   */
  suffixContent?: boolean;
  /**
   初始是否选中
   */
  defaultChecked?: boolean;
  /**
   失效状态
   */
  disabled?: boolean;
  /**
   加载中
   */
  loading?: boolean;
  /**
   尺寸
   */
  size?: string;
  /**
   变化时回调函数
   */
  onChange?: any;
  /**
   点击时回调函数
   */
  onClick?: any;
  /**
   自定义 `className`
   */
  className?: string;
  /**
   未选中时的内容
   */
  inactiveValue?: number | string;
  /**
   	选中时的内容
   */
  activeValue?: number | string;
  /**
   	`switch` 打开时的背景色
   */
  activeColor?: string;
  /**
   `switch` 关闭时的背景色
   */
  inactiveColor?: string;
  }