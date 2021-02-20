import React from 'react';
import classnames from 'classnames';
import { DividerProps } from './interface';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';

const Divider = (props: DividerProps) => {
  const { prefixCls: customPrefixCls, className, style } = props;
  const prefixCls = usePrefixCls('menu', customPrefixCls);
  return <li data-testid="menu-divider" className={classnames(className, `${prefixCls}-item-divider`)} style={style} />;
};

export default Divider;
