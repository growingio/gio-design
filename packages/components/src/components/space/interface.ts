export type SpaceSize = 'small' | 'middle' | 'large' | number;
export type SpaceDirection = 'horizontal' | 'vertical';
export type SpaceAlign = 'start' | 'center' | 'end' | 'baseline';

export interface SpaceProps {
  prefixCls?: string;
  className?: string;
  size?: SpaceSize;
  direction?: SpaceDirection;
  align?: SpaceAlign;
  style?: React.CSSProperties;
}
