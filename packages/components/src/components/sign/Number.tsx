import React from 'react';
import classnames from 'classnames';
import { ISignNumberProps } from './interface';

const Number: React.FC<ISignNumberProps> = ({
  prefixCls,
  className,
  style,
  count,
  showZero,
  visible,
  magnitude,
  offset = [0, 0],
}: ISignNumberProps) => {
  const displayCount = count >= magnitude ? `${magnitude - 1}+` : count;
  const isZero = count === 0 || !count;
  const isHide = !visible || (!showZero && isZero);

  const numberCls = classnames(className, {
    [`${prefixCls}--hide`]: isHide,
  });

  const numberStyle: React.CSSProperties = {
    ...style,
    right: `-${offset[0]}px`,
    top: `-${offset[1]}px`,
  };

  return (
    <span className={numberCls} style={numberStyle}>
      {displayCount}
    </span>
  );
};

export default Number;
