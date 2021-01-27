import React, { createContext, Context, useMemo } from 'react';
import classNames from 'classnames';
import { isArray, isUndefined } from 'lodash';
import { RowProps, RowContextState } from './interface';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import { dataMap } from './help';

export const RowContext: Context<RowContextState> = createContext({ gutters: [0, 0] });

const Row = ({
  component: Component = 'div',
  prefixCls: customizePrefixCls,
  className,
  style,
  children,
  direction,
  justify,
  alignItems,
  alignContent,
  wrap,
  gutter = 0,
}: React.PropsWithChildren<RowProps>) => {
  const prefixCls = usePrefixCls('row', customizePrefixCls);

  const gutters: [number, number] = useMemo(() => {
    if (isUndefined(gutter)) return [0, 0];
    return isArray(gutter) ? gutter : [gutter, gutter];
  }, [gutter]);

  const cssVars = dataMap(
    {
      direction,
      justify,
      alignItems,
      alignContent,
      wrap,
    },
    '--gio-grid'
  ) as React.CSSProperties;

  const rowHackStyle = {
    ...(gutters[0] > 0
      ? {
          marginLeft: gutters[0] / -2,
          marginRight: gutters[0] / -2,
        }
      : {}),
    ...(gutters[1] > 0
      ? {
          marginTop: gutters[1] / -2,
          marginBottom: gutters[1] / 2,
        }
      : {}),
  };

  return (
    <RowContext.Provider value={{ gutters }}>
      <Component className={classNames(prefixCls, className)} style={{ ...cssVars, ...rowHackStyle, ...style }}>
        {children}
      </Component>
    </RowContext.Provider>
  );
};

export default Row;
