import React from 'react';
import classNames from 'classnames';

import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import { GridProps } from './interface';
import { clip, dataMap, isNumber } from './help';

export { GridProps } from './interface';

const Grid: React.FC<GridProps> = (props: React.PropsWithChildren<GridProps>) => {
  const {
    component: Component = 'div',
    prefixCls: customizePrefixCls,
    className,
    children,
    direction,
    justify,
    alignItems,
    alignContent,
    wrap,
    span,
    gap,
    container = false,
    collapse = false,
    style,
  } = props;
  const prefixCls = usePrefixCls('grid', customizePrefixCls);
  const cssProps = dataMap(
    {
      direction,
      justify,
      alignItems,
      alignContent,
      span: isNumber(span) ? clip(0, 12, span as number) : span,
      gap,
      wrap,
    },
    '--gio-grid'
  );

  return (
    <Component
      className={classNames(prefixCls, className)}
      data-collapse={collapse}
      data-gap={!!gap}
      data-container={!!container}
      style={{ ...cssProps, ...style }}
    >
      {children}
    </Component>
  );
};

export default Grid;
