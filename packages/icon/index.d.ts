import React from 'react';

export interface IconProps {
  type: string;
  color?: string;
  size?: number | 'small' | 'normal' | 'middle' | 'large' | 'huge' | 'mediumLarge';
  style?: { [key: string]: string | number };
  [key: string]: any;
}

declare const Icon: React.SFC<IconProps>

export default Icon;