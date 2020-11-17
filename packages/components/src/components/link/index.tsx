/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import classnames from 'classnames';
import { TLinkProps } from './interface';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';

const Link: React.FC<TLinkProps> = ({
  component = 'a',
  to = '',
  disabled,
  prefix: customPrefixCls,
  className,
  children,
  ...otherProps
}: TLinkProps) => {
  const prefixCls = usePrefixCls('link', customPrefixCls);
  const cls = classnames(className, prefixCls, {
    [`${prefixCls}--disabled`]: disabled,
  });

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }

    if (otherProps.onClick) {
      otherProps.onClick(e);
      return;
    }

    if (to) {
      window.location.href = to;
    }
  };

  const componentProps = {
    className: cls,
    ...otherProps,
    onClick: handleClick,
  };

  if (component === 'a') {
    return (
      <a href={to} {...componentProps}>
        {children}
      </a>
    );
  }

  const ComponentProp = component;
  return <ComponentProp {...componentProps}>{children}</ComponentProp>;
};

export default Link;
