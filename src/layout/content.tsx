import React, { useContext, useEffect } from 'react';
import classNames from 'classnames';
import { isNumber, isString } from 'lodash';
import { usePrefixCls } from '@gio-design/utils';
import { LayoutContentProps } from './interfaces';
import { LayoutContext } from './layout';

const getWidthAndMargin = (maxWidth: number | string, wide: boolean, margin: number): React.CSSProperties => {
  if (maxWidth === 'auto') {
    // eslint-disable-next-line no-param-reassign
    maxWidth = '100%';
  }
  return { maxWidth: isString(maxWidth) ? maxWidth : `${maxWidth}px`, margin: wide ? '0 auto' : `0 ${margin}px` };
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
