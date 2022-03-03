import classNames from 'classnames';
import React from 'react';
import { LoadingTwoTone } from '@gio-design/icons';
import { OverridableComponent, usePrefixCls } from '@gio-design/utils';
import { ButtonProps, ButtonTypeMap } from './interface';
import Link from '../link';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    type = 'primary',
    size = 'normal',
    loading = false,
    disabled = false,
    htmlType = 'button',
    active = false,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: 在使用 Button 组件的时候能识别出 component prop，但是在这里却无法识别
    component = 'button',
    prefix,
    suffix,
    className,
    children,
    ...restProps
  } = props;

  const prefixCls = usePrefixCls('button');
  const classes = classNames([className, prefixCls], {
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

  const Component: React.ElementType = component;
  const buttonProps: React.ButtonHTMLAttributes<HTMLButtonElement> = {};
  if (Component === 'button') {
    buttonProps.type = htmlType;
    buttonProps.disabled = disabled || loading;
  } else {
    if (Component !== 'a' || !Object.is(Component, Link)) {
      buttonProps.role = 'button';
    }
    if (disabled) {
      buttonProps['aria-disabled'] = disabled;
    }
  }

  return (
    <Component
      ref={ref}
      className={classes}
      data-testid="button"
      tabIndex={disabled || loading ? -1 : 0}
      {...buttonProps}
      {...restProps}
    >
      {prefixIcon}
      {children}
      {suffixIcon}
    </Component>
  );
}) as OverridableComponent<ButtonTypeMap>;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Button.displayName = 'Button';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Button.defaultProps = {
  type: 'primary',
  size: 'normal',
  loading: false,
  disabled: false,
  htmlType: 'button',
};

export default Button;
