import React from 'react';
import classnames from 'classnames';
import { ISignDotProps } from './interface';

const Dot: React.FC<ISignDotProps> = ({ prefixCls, className, status, size, style, visible }) => {
  const cls = classnames(className, `${prefixCls}__dot--${status}`, `${prefixCls}__dot--${size}`, {
    [`${prefixCls}--hide`]: !visible,
  });
  return <span className={cls} style={style} />;
};

export default Dot;
