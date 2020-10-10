import React, { useContext } from 'react';
import classNames from 'classnames';

import { ConfigContext } from '../config-provider';
import { SpaceProps, SpaceSize } from './interface';

const sizeMap = ['small', 'middle', 'large'];
const size2Number = (size: SpaceSize) => {
  if (typeof size === 'number') {
    return size;
  } else if (sizeMap.indexOf(size) >= 0) {
    return (sizeMap.indexOf(size) + 1) * 8;
  } else {
    return '';
  }
};

const Space: React.FC<SpaceProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    direction = 'horizontal',
    align,
    size = 'small',
    children,
    ...others
  } = props;
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('space', customizePrefixCls);
  const cls = classNames(prefixCls, className, {
    [`${prefixCls}-${direction}`]: !!direction,
    [`${prefixCls}-align-${align}`]: !!align,
  });
  const marginDir = direction === 'horizontal' ? 'marginRight' : 'marginBottom';
  const childrenCount = React.Children.count(children);

  if (childrenCount === 0) {
    return null;
  }

  const childrenList = childrenCount > 0 ? children : [children];
  const childNode = React.Children.map(childrenList, (child) => (
    <div className={`${prefixCls}-item`} style={{ [marginDir]: size2Number(size) }}>
      {child}
    </div>
  ));

  return (
    <div className={cls} {...others}>
      {childNode}
    </div>
  );
};

export default Space;
