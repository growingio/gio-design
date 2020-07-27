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
  displayTooltip?: boolean;
  placement?: tooltipPlacement;
  prefixCls?: string;
}

export interface UserAvatarType {
  name: string;
  src?: string;
}

export interface AvatarGroupProps {
  className?: string;
  number?: number;
  users: UserAvatarType[];
  placement?: tooltipPlacement;
}
