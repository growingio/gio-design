import React from 'react';
import Icon from './dist/Icon';

const sizeMap = {
  small: 12,
  normal: 14,
  large: 18,
  // for compatibility
  mediumLarge: 16, 
  middle: 14,
  huge: 24
}

const GIOIcon = ({ type, size, style, ...rest }) => (
  <Icon
    kind={type}
    size={!size ? sizeMap.normal : (sizeMap[size] || size)}
    style={{
      verticalAlign: 'middle',
      marginRight: 5,
      ...style
    }}
    {...rest}
  />
);

export default GIOIcon;
