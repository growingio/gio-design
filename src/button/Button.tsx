import classNames from 'classnames';
import React from 'react';
import { LoadingTwoTone } from '@gio-design/icons';
import { usePrefixCls } from '@gio-design/utils';
import { ButtonProps } from './interface';
import WithRef from '../utils/withRef';

const Button = WithRef<HTMLButtonElement, ButtonProps>((props, ref) => {
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

  const prefixCls = usePrefixCls('button');
  const classes = classNames([prefixCls, className], {
    [`${prefixCls}_${type}`]: type,
    [`${prefixCls}_${size}`]: size,
    [`${prefixCls}_loading`]: loading,
    [`${prefixCls}_disabled`]: disabled,
    [`${prefixCls}_active`]: active,
  });

  const prefixIcon = loading ? (
    <span className={`${prefixCls}-prefix-icon`}>
      <LoadingTwoTone rotating />
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

export const BUTTON_DISPLAY_NAME = 'Button';

Button.displayName = BUTTON_DISPLAY_NAME;

export default Button;
