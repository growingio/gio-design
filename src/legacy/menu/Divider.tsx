import React from 'react';
import classnames from 'classnames';
import { usePrefixCls } from '@gio-design/utils';
import { DividerProps } from './interface';

const Divider = (props: DividerProps) => {
  const { prefixCls: customPrefixCls, className, style } = props;
  const prefixCls = usePrefixCls('menu', customPrefixCls);
  return <li data-testid="menu-divider" className={classnames(className, `${prefixCls}-item-divider`)} style={style} />;
};

export default Divider;
