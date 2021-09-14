import React from 'react';
import classnames from 'classnames';
import { usePrefixCls } from '@gio-design/utils';
import { DividerProps } from './interfaces';
import { PREFIX } from './constants';

function Divider({ className, style }: DividerProps) {
  const cls = classnames(`${usePrefixCls(PREFIX)}__divider`, className);
  return <li role="separator" className={cls} style={style} />;
}

export default Divider;
