import React from 'react';
/**
 * 如下文件是 build 的时候自动生成的，build 完成后会自动删除
 */
import InnerIcon from './Icon';

type StringSizeType = 'small' | 'normal' | 'middle' | 'large' | 'huge' | 'mediumLarge';
export interface IconProps {
  type: string;
  color?: string;
  size?: number | StringSizeType;
  style?: React.CSSProperties;
  className?: string;
  height?: number | string;
  width?: number | string;
  onClick?: (e: any) => void;
  preview?: boolean;
  wrapperStyle?: React.CSSProperties;
}

const sizeMap: Record<StringSizeType, number> = {
  small: 12,
  normal: 14,
  large: 18,
  // for compatibility
  mediumLarge: 16,
  middle: 14,
  huge: 24,
};
const Icon: React.FC<IconProps> = ({ type, size, style, ...rest }) => (
  <InnerIcon
    kind={type}
    size={!size ? sizeMap.normal : sizeMap[size as StringSizeType] || (size as number)}
    style={{
      verticalAlign: 'middle',
      marginRight: 5,
      ...style,
    }}
    {...rest}
  />
);

export default Icon;
