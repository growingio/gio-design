import React from 'react';
import classnames from 'classnames';
import { usePrefixCls } from '@gio-design/utils';
import { LinkProps } from './interface';

export { LinkProps } from './interface';

const Link: React.FC<LinkProps> = (props: LinkProps) => {
  const {
    component = 'a',
    to = '',
    disabled,
    prefix: customPrefixCls,
    className,
    children,
    icon,
    ...otherProps
  } = props;

  const prefixCls = usePrefixCls('link-list', customPrefixCls);
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

  if (component === 'a' && !otherProps.onClick) {
    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <a href={to} {...componentProps}>
        {icon}
        {children}
      </a>
    );
  }

  const ComponentProp = component;
  return (
    <ComponentProp {...componentProps}>
      {icon}
      {children}
    </ComponentProp>
  );
};

export default Link;
