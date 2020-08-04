import { AvatarProps } from '../avatar';

export type SkeletonAvatarProps = Pick<AvatarProps, 'size'>;
export interface SkeletonParagraphProps {
  row?: number;
}

export interface SkeletonImageProps {
  prefixCls?: string;
  delay?: number;
  loading?: boolean;
  width?: number;
  children?: React.ReactNode;
  color?: string;
}

export interface SkeletonProps {
  prefixCls?: string;
  delay?: number;
  loading?: boolean;
  title?: boolean;
  avatar?: boolean | SkeletonAvatarProps;
  paragraph?: boolean | SkeletonParagraphProps;
  active?: boolean;
  children?: React.ReactNode;
}
