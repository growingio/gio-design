import { LoadingOutlined } from '@gio-design/icons';
import classNames from 'classnames';
import React from 'react';
import usePrefixCls from '../utils/hooks/use-prefix-cls';
import { LinkProps } from './interface';

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const { className, children, prefix, loading = false, disabled = false, ...restProps } = props;

  const prefixCls = usePrefixCls('link');
  const classes = classNames([prefixCls, className], {
    [`${prefixCls}_disabled`]: disabled,
    [`${prefixCls}_loading`]: loading,
  });

  const prefixIcon = loading ? (
    <span className={`${prefixCls}-prefix-icon`}>
      <LoadingOutlined rotating />
    </span>
  ) : (
    prefix && <span className={`${prefixCls}-prefix-icon`}>{prefix}</span>
  );

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <a className={classes} ref={ref} aria-disabled={disabled || loading} {...restProps}>
      {prefixIcon}
      {children}
    </a>
  );
});

Link.displayName = 'Link';

Link.defaultProps = {
  loading: false,
  disabled: false,
};

export default Link;
