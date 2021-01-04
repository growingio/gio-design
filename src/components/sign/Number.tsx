import React from 'react';
import classnames from 'classnames';
import { ISignNumberProps, TPlacement } from './interface';

const getOffsetByPlacement = (placement: TPlacement, offset: [number, number]) => {
  switch (placement) {
    case 'top':
      return {
        left: `calc(50% + ${offset[0]}px)`,
        top: `-${offset[1]}px`,
      };
    case 'right':
      return {
        right: `-${offset[0]}px`,
        top: `calc(50% - ${offset[1]}px)`,
      };
    case 'bottom':
      return {
        left: `calc(50% + ${offset[0]}px)`,
        bottom: `${offset[1]}px`,
      };
    case 'left':
      return {
        left: `${offset[0]}px`,
        top: `calc(50% - ${offset[1]}px)`,
      };
    case 'leftTop':
      return {
        left: `${offset[0]}px`,
        top: `-${offset[1]}px`,
      };
    case 'leftBottom':
      return {
        left: `${offset[0]}px`,
        bottom: `${offset[1]}px`,
      };
    case 'rightTop':
      return {
        right: `-${offset[0]}px`,
        top: `-${offset[1]}px`,
      };
    case 'rightBottom':
      return {
        right: `-${offset[0]}px`,
        bottom: `${offset[1]}px`,
      };
    default:
      return {};
  }
};

const Number: React.FC<ISignNumberProps> = ({
  prefixCls,
  className,
  style,
  count,
  showZero,
  visible,
  magnitude,
  offset = [0, 0],
  placement = 'rightTop',
}: ISignNumberProps) => {
  const displayCount = count >= magnitude ? `${magnitude - 1}+` : count;
  const isZero = count === 0 || !count;
  const isHide = !visible || (!showZero && isZero);

  const numberCls = classnames(className, {
    [`${prefixCls}--hide`]: isHide,
  });

  const numberStyle: React.CSSProperties = {
    ...style,
    ...getOffsetByPlacement(placement, offset),
  };

  return (
    <span className={numberCls} style={numberStyle}>
      {displayCount}
    </span>
  );
};

export default Number;
