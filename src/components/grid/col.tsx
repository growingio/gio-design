import React, { useContext } from 'react';
import classNames from 'classnames';
import { isNumber } from 'lodash';
import { ColProps } from './interface';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import { RowContext } from './row';

const Col = ({
  component: Component = 'div',
  prefixCls: customizePrefixCls,
  children,
  className,
  style,
  order,
  offset,
  span = 1,
}: React.PropsWithChildren<ColProps>) => {
  const prefixCls = usePrefixCls('col', customizePrefixCls);
  const { gutters } = useContext(RowContext);

  const mergedStyle: React.CSSProperties = {
    ...(gutters[0] > 0
      ? {
          paddingLeft: gutters[0] / 2,
          paddingRight: gutters[0] / 2,
        }
      : {}),
    ...(gutters[1] > 0
      ? {
          paddingTop: gutters[1] / 2,
          paddingBottom: gutters[1] / 2,
        }
      : {}),
    ...style,
  };

  return (
    <Component
      className={classNames(prefixCls, className, `${prefixCls}-span-${span}`, {
        [`${prefixCls}-order-${order}`]: isNumber(order),
        [`${prefixCls}-offset-${offset}`]: isNumber(offset),
      })}
      style={mergedStyle}
    >
      {children}
    </Component>
  );
};

export default Col;
