import React, { useContext, useEffect } from 'react';
import classNames from 'classnames';
import { isNumber } from 'lodash';
import { LayoutContentProps } from './interfaces';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import { LayoutContext } from './layout';

const getWidthAndMargin = (maxWidth: number | 'auto', wide: boolean, margin: number): React.CSSProperties => {
  return { maxWidth: `${maxWidth}px`, margin: wide ? '0 auto' : `0 ${margin}px` };
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

  return (
    <main className={classNames(prefixCls, className)} style={style}>
      <div className={`${prefixCls}-main`} style={getWidthAndMargin(maxWidth, layoutState.wide, margin)}>
        {children}
      </div>
    </main>
  );
};

export default Content;
