import React from 'react';
import classnames from 'classnames';
import { DividerProps } from './interfaces';
import { useRootPrefixCls } from './utils';

function Divider({ className, style }: DividerProps) {
  const cls = classnames(`${useRootPrefixCls()}__divider`, className);
  return <li role="separator" className={cls} style={style} />;
}

export default Divider;
