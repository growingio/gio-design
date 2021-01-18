import React from 'react';
import classNames from 'classnames';
import { LayoutProps } from './interfaces';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';

const Header = ({ 
  prefixCls: customizePrefixCls,
  className,
  style,
  children 
}: LayoutProps) => {
 
  const prefixCls = usePrefixCls('layout-header', customizePrefixCls);
  return (
    <header className={classNames(prefixCls, className)} style={style}>{children}</header>
  );
}

export default Header;