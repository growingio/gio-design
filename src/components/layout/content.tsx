import React from 'react';
import classNames from 'classnames';
import { isString } from 'lodash';
import { LayoutContentProps } from './interfaces';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';

const getWidthAndMargin = (maxWidth: number | string): React.CSSProperties => {
  if (maxWidth === 'auto') {
    // eslint-disable-next-line no-param-reassign
    maxWidth = '100%';
  }
  return { maxWidth: isString(maxWidth) ? maxWidth : `${maxWidth}px` };
};

const Content = ({
  prefixCls: customizePrefixCls,
  className,
  style,
  children,
  maxWidth = 1320,
}: LayoutContentProps) => {
  const prefixCls = usePrefixCls('layout-content', customizePrefixCls);

  return (
    <main className={classNames(prefixCls, className)} style={style}>
      <div className={`${prefixCls}-main`} style={getWidthAndMargin(maxWidth)}>
        {children}
      </div>
    </main>
  );
};

export default Content;
