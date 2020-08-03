import React from 'react';
import classnames from 'classnames';
import { ISignDotProps } from './interface';

const Dot: React.FC<ISignDotProps> = ({ prefixCls, status, size, style, visible }) => {
  const cls = classnames(`${prefixCls}__dot`, `${prefixCls}__dot--${status}`, `${prefixCls}__dot--${size}`, {
    [`${prefixCls}--hide`]: !visible,
  });
  return <sup className={cls} style={style} />;
};

export default Dot;
