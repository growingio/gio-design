import classNames from 'classnames';
import React from 'react';
import { LoadingOutlined } from '@gio-design/icons';
import { ButtonProps } from './interface';
import usePrefixCls from '../utils/hooks/use-prefix-cls';

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    type = 'primary',
    size = 'normal',
    loading = false,
    disabled: disabledProp = false,
    htmlType = 'button',
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
  });

  const prefixIcon = loading ? (
    <span className={`${prefixCls}-prefix-icon`}>
      <LoadingOutlined rotating />
    </span>
  ) : (
    prefix && <span className={`${prefixCls}-prefix-icon`}>{prefix}</span>
  );

  const suffixIcon = suffix && <span className={`${prefixCls}-suffix-icon`}>{suffix}</span>;

  const disabled = disabledProp || loading;

  const other: typeof restProps = {
    role: 'button',
    'aria-disabled': disabled,
  };

  return (
    <button
      ref={ref}
      // eslint-disable-next-line react/button-has-type
      type={htmlType}
      className={classes}
      disabled={disabled}
      data-testid="button"
      {...other}
      {...restProps}
    >
      {prefixIcon}
      {children}
      {suffixIcon}
    </button>
  );
});

Button.displayName = 'Button';

Button.defaultProps = {
  type: 'primary',
  size: 'normal',
  loading: false,
  disabled: false,
  htmlType: 'button',
};

export default Button;
