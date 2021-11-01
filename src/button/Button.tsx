import classNames from 'classnames';
import React from 'react';
import { LoadingOutlined } from '@gio-design/icons';
import { ButtonProps } from './interface';
import usePrefixCls from '../utils/hooks/use-prefix-cls';
import IconButton from './IconButton';
import WithRef from '../utils/withRef';
import WithSubComponent from '../utils/withSubComponent';

const InternalButton = WithRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    type = 'primary',
    size = 'normal',
    loading = false,
    disabled = false,
    htmlType = 'button',
    active = false,
    prefix,
    suffix,
    className,
    children,
    ...restProps
  } = props;

  const prefixCls = usePrefixCls('button-new');
  const classes = classNames([className, prefixCls], {
    [`${prefixCls}_${type}`]: type,
    [`${prefixCls}_${size}`]: size,
    [`${prefixCls}_loading`]: loading,
    [`${prefixCls}_disabled`]: disabled,
    [`${prefixCls}_active`]: active,
  });

  const prefixIcon = loading ? (
    <span className={`${prefixCls}-prefix-icon`}>
      <LoadingOutlined rotating />
    </span>
  ) : (
    prefix && <span className={`${prefixCls}-prefix-icon`}>{prefix}</span>
  );

  const suffixIcon = suffix && <span className={`${prefixCls}-suffix-icon`}>{suffix}</span>;

  return (
    <button
      ref={ref}
      // eslint-disable-next-line react/button-has-type
      type={htmlType}
      className={classes}
      disabled={disabled || loading}
      data-testid="button"
      {...restProps}
    >
      {prefixIcon}
      {children}
      {suffixIcon}
    </button>
  );
});

const Button = WithSubComponent(InternalButton, { IconButton });

Button.displayName = 'Button';

Button.defaultProps = {
  type: 'primary',
  size: 'normal',
  loading: false,
  disabled: false,
  htmlType: 'button',
};

export default Button;
