import { TooltipProps } from '../tooltip';

export interface AvatarProps {
  /**
   * 设置头像的尺寸大小
   * @default medium
   */
  size?: 'small' | 'medium' | 'large' | 'x-large';

  /**
   * Hover 时是否显示更多操作
   * @default false
   */
  droppable?: boolean;
  /**
    设置自定义图片
   */
  src?: string;
  /**
   * 是否省略用户名称
   * @default true
   */
  omit?: boolean;
  /**
   自定义混入 `CSS` 类
   */
  className?: string;
  /**
   自定义混入 `CSS` 样式
   */
  style?: React.CSSProperties;
  /**
   * 气泡框位置，可选 12 个方位
   * @default bottom
   */
  placement?: TooltipProps['placement'];
  /**
   自定义 `CSS` 类前缀
   */
  prefixCls?: string;
  /**
   * 是否用 `Tooltip` 显示用户名
   * @default false
   */
  displayTooltip?: boolean;
  /**
   * Tooltip 展示的内容
   */
  tooltipTitle?: React.ReactNode;
  /**
   * 设置字符，用作用户头像
   */
  children?: string;

  /**
   * 圆头像或方头像
   * @default circle
   */
  mode?: 'circle' | 'square';

  /**
   * 自定义背景色
   */
  backgroundColor?: React.CSSProperties['backgroundColor'];

  /**
   * 设置图标头像
   */
  icon?: React.ReactNode;
}

export interface UserAvatarType extends AvatarProps {
  name: string;
}

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 展示的头像数，如果超过此参数，剩余的头像将会隐藏
   * @default 5
   */
  number?: number;
  users: UserAvatarType[];
  /**
   * 气泡框位置，可选 12 个方位
   * @default bottom
   */
  placement?: TooltipProps['placement'];
  /**
   * 是否用 `Tooltip` 显示用户名
   * @default true
   */
  displayTooltip?: boolean;
}
