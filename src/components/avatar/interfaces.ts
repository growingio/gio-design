export type tooltipPlacement =
  | 'top'
  | 'topRight'
  | 'topLeft'
  | 'leftTop'
  | 'left'
  | 'leftBottom'
  | 'rightTop'
  | 'right'
  | 'rightBottom'
  | 'bottomLeft'
  | 'bottom'
  | 'bottomRight';

export interface AvatarProps {
  /**
   设置头像的尺寸大小
   */
  size?: 'small' | 'default' | 'large' | 'huge';
  droppable?: boolean;
  /**
    设置头像的尺寸大小
   */
  src?: string;
  /**
   * 是否在不存在src时显示默认头像，显示默认头像将不显示文字
   */
  default?: boolean;
  /**
   是否省略用户名称
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
   气泡框位置，可选 12 个方位
   */
  placement?: tooltipPlacement;
  /**
   自定义 `CSS` 类前缀
   */
  prefixCls?: string;
  /**
   用 `Tooltip` 显示用户名
   */
  displayTooltip?: boolean;
  /**
   自定义气泡框的内容
   */
  tooltipTitle?: React.ReactNode;
  /**
   设置字符，用作用户头像
   */
  children?: string;
}

export interface UserAvatarType {
  name: string;
  src?: string;
  displayTooltip?: boolean;
  tooltipTitle?: React.ReactNode;
}

export interface AvatarGroupProps {
  className?: string;
  style?: React.CSSProperties;
  number?: number;
  users: UserAvatarType[];
  placement?: tooltipPlacement;
  displayTooltip?: boolean;
}
