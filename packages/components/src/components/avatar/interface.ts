export interface AvatarProps {
  size?: 'small' | 'default' | 'large' | 'huge';
  droppable?: boolean;
  src?: string;
  omit?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export interface UserAvatarType {
  name: string;
  src?: string;
}

export interface AvatarGroupProps {
  className?: string;
  number?: number;
  users: UserAvatarType[];
}
