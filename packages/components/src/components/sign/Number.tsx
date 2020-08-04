import React from 'react';
import classnames from 'classnames';
import { ISignNumberProps } from './interface';

const Number: React.FC<ISignNumberProps> = ({
  prefixCls,
  className,
  style,
  count = 0,
  showZero,
  visible,
  magnitude = 100,
}) => {
  const displayCount = count >= magnitude ? `${magnitude - 1}+` : count;
  const isZero = count === 0 || !count;
  const isHide = !visible || (!showZero && isZero);

  const numberCls = classnames(className, {
    [`${prefixCls}--hide`]: isHide,
  });

  return (
    <span className={numberCls} style={style}>
      {displayCount}
    </span>
  );
};

export default Number;
