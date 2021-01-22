import React, { useContext, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { isNumber } from 'lodash';
import { LayoutContentProps } from './interfaces';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import { LayoutContext } from './layout';

const Content = ({ 
  prefixCls: customizePrefixCls,
  className,
  style,
  children,
  maxWidth = 1200,
  margin = 20
}: LayoutContentProps) => {
  
  const { layoutState, setContentState } = useContext(LayoutContext);  
  useEffect(() => {
    setContentState({ maxWidth: isNumber(maxWidth) ? maxWidth : 0, margin });
  }, [margin, maxWidth, setContentState]);

  const prefixCls = usePrefixCls('layout-content', customizePrefixCls);
  
  const mergedStyle: React.CSSProperties = useMemo(() => ({ 
    '--layout-content-maxWidth': maxWidth === 'auto' ? '100%' : `${maxWidth}px`,
    '--layout-content-grow': maxWidth === 'auto' ?  1 : 0,
    ...((maxWidth === 'auto' || !layoutState.wide) ? { margin:  `0 ${margin}px`} : {}),
    ...style
  }), [maxWidth, layoutState.wide, margin, style]);
  
  return (
    <main
      className={classNames(prefixCls, className)}
      style={mergedStyle}
    >
      {children}
    </main>
  );
}

export default Content;