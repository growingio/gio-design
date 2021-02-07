import React, { useContext, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { isNumber } from 'lodash';
import { LayoutContentProps } from './interfaces';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import { LayoutContext } from './layout';

const getWidthAndMargin = (maxWidth: number | 'auto', wide: boolean, margin: number): React.CSSProperties => {
  if (wide) {
    return { width: `${maxWidth}px`, margin: '0 auto' };
  }
  return { flexGrow: 1, margin: `0 ${margin}px` };
};

const Content = ({
  prefixCls: customizePrefixCls,
  className,
  style,
  children,
  maxWidth = 1320,
  margin = 20,
}: LayoutContentProps) => {
  const { layoutState, setContentState } = useContext(LayoutContext);
  useEffect(() => {
    setContentState({ maxWidth: isNumber(maxWidth) ? maxWidth : 0, margin });
  }, [margin, maxWidth, setContentState]);

  const prefixCls = usePrefixCls('layout-content', customizePrefixCls);

  const mergedStyle: React.CSSProperties = useMemo(
    () => ({
      ...getWidthAndMargin(maxWidth, layoutState.wide, margin),
      ...style,
    }),
    [maxWidth, layoutState.wide, margin, style]
  );

  return (
    <main className={classNames(prefixCls, className)} style={mergedStyle}>
      {children}
    </main>
  );
};

export default Content;
