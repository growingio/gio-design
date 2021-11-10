import { CommonProps } from '@gio-design/utils';
import { TooltipProps } from '../tooltip';

export interface TextProps extends CommonProps {
  /**
   * The text you want to clamp.
   */
  children: string;
  /**
   * The color of text
   * @default `inherit`
   */
  color?: React.CSSProperties['color'];
  /**
   * Max count of lines allowed.
   */
  lines?: number;
  /**
   * The font size of text
   */
  size?: 'small' | 'middle' | 'large';
  /**
   * Show tooltip when clamp text
   */
  tooltip?: Pick<TooltipProps, 'disabled' | 'placement'>;
  /**
   * Trim right the clamped text to avoid putting the ellipsis on an empty line.
   */
  trimRight?: boolean;
}

export interface TitleProps extends Pick<CommonProps, 'className'> {
  children: React.ReactNode;
  level: 1 | 2 | 3 | 4;
}
