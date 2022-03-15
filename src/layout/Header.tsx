/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import classNames from 'classnames';
import { usePrefixCls } from '@gio-design/utils';
import { LayoutHeaderProps, LayoutHeaderSectionProps, LayoutHeaderDividerProps } from './interfaces';

const Header = ({ prefixCls: customizePrefixCls, className, style, children, justify }: LayoutHeaderProps) => {
  const prefixCls = usePrefixCls('layout-header', customizePrefixCls);
  const mergedStyle: React.CSSProperties = {
    ['--layout-header-justify' as any]: justify,
    ...style,
  } as React.CSSProperties;
  return (
    <header className={classNames(prefixCls, className)} style={mergedStyle}>
      {children}
    </header>
  );
};

export const HeaderSection = ({
  prefixCls: customizePrefixCls,
  className,
  style,
  children,
  justify = 'space-around',
}: LayoutHeaderSectionProps) => {
  const prefixCls = usePrefixCls('layout-header-section', customizePrefixCls);
  const mergedStyle: React.CSSProperties = {
    ['--layout-header-section-justify' as any]: justify,
    ...style,
  };
  return (
    <section className={classNames(prefixCls, className)} style={mergedStyle}>
      {children}
    </section>
  );
};

export const HeaderDivider = ({ style, className, prefixCls: customizePrefixCls }: LayoutHeaderDividerProps) => {
  const prefixCls = usePrefixCls('layout-header-divider', customizePrefixCls);
  return <div className={classNames(prefixCls, className)} style={style} />;
};

Header.HeaderSection = HeaderSection;
Header.HeaderDivider = HeaderDivider;

export default Header;
