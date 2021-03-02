import React from 'react';
import classnames from 'classnames';
import { DividerProps } from './interfaces';
import { PREFIX } from './constants';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';

function Divider({ className, style }: DividerProps) {
  const cls = classnames(`${usePrefixCls(PREFIX)}__divider`, className);
  return <li role="separator" className={cls} style={style} />;
}

export default Divider;
