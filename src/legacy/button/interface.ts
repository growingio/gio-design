export type ButtonType = 'primary' | 'secondary' | 'text';
export type ButtonHTMLType = 'submit' | 'button' | 'reset';

export interface BaseButtonProps {
  /**
   设置按钮类型，可选值为 `primary` `secondary` `link` `text` 或者不设
   */
  type?: ButtonType;
  /**
   设置按钮的图标组件
   */
  icon?: React.ReactNode;
  /**
   设置按钮大小
   */
  size?: 'small' | 'medium' | 'large';
  /**
   设置按钮载入状态
   */
  loading?: boolean;
  /**
   only icon 的 mini 大小的按钮，其他类型按钮不适应
   */
  mini?: boolean;
  /**
   自定义class前缀
   */
  prefixCls?: string;
  /**
   自定义className
   */
  className?: string;
  /**
   将按钮宽度调整为其父宽度的选项
   */
  block?: boolean;
  /**
   按钮内容元素
   */
  children?: React.ReactNode;
  /**
    是否自动在两个字符中间插入空格符
   */
  autoInsertSpace?: boolean;
}

export type ButtonProps = {
  htmlType?: ButtonHTMLType;
  onClick?: React.MouseEventHandler<HTMLElement>;
} & BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<any>, 'type' | 'onClick'>;
