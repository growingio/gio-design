import { LoadingOutlined } from '@gio-design/icons';
import classNames from 'classnames';
import React from 'react';
import usePrefixCls from '../utils/hooks/use-prefix-cls';
import { LinkProps } from './interface';

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, children, prefix, loading = false, disabled: disabledProp = false, href, ...restProps }, ref) => {
    const prefixCls = usePrefixCls('link');
    const classes = classNames([prefixCls, className], {
      [`${prefixCls}_disabled`]: disabledProp,
      [`${prefixCls}_loading`]: loading,
    });

    const prefixIcon = loading ? (
      <span className={`${prefixCls}-prefix-icon`}>
        <LoadingOutlined rotating />
      </span>
    ) : (
      prefix && <span className={`${prefixCls}-prefix-icon`}>{prefix}</span>
    );

    const disabled = disabledProp || loading;

    return (
      <a
        className={classes}
        ref={ref}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        data-testid="link"
        href={disabled ? undefined : href}
        {...restProps}
      >
        {prefixIcon}
        {children}
      </a>
    );
  }
);

Link.displayName = 'Link';

Link.defaultProps = {
  loading: false,
  disabled: false,
};

export default Link;
