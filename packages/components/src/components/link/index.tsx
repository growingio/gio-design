import React from 'react';
import classnames from 'classnames';
import { TLinkProps } from './interface';

const Link: React.FC<TLinkProps> = ({
  component = 'a',
  to = '',
  disabled,
  prefix: customPrefixCls,
  className,
  children,
  ...otherProps
}) => {
  const prefixCls = customPrefixCls ? customPrefixCls : 'gio-link';

  const cls = classnames(className, prefixCls, {
    [`${prefixCls}--disabled`]: disabled,
  });

  if (component === 'a') {
    return (
      <a href={to} className={cls} {...otherProps}>
        {children}
      </a>
    );
  }

  // TODO: 明确 e 的类型 e: React.MouseEvent<typeof component>
  const handleClick = (e: any) => {
    if (otherProps.onClick && !disabled) {
      otherProps.onClick(e);
      return;
    }
    if (to && !disabled) {
      window.location.href = to;
    }
  };

  const cloneComponentProps = {
    className: cls,
    ...otherProps,
    onClick: handleClick,
  };

  const ComponentProp = component;
  return <ComponentProp {...cloneComponentProps}>{children}</ComponentProp>;
};

export default Link;
