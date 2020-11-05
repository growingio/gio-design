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
  size?: 'small' | 'default' | 'large' | 'huge';
  droppable?: boolean;
  src?: string;
  omit?: boolean;
  className?: string;
  children?: string;
  style?: React.CSSProperties;
  placement?: tooltipPlacement;
  prefixCls?: string;
  displayTooltip?: boolean;
  tooltipTitle?: React.ReactNode;
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
