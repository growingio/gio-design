import React from 'react';
import classNames from 'classnames';
import { OverridableComponent, usePrefixCls } from '@gio-design/utils';
import { IconButtonProps, IconButtonTypeMap } from './interface';
import Button from './Button';

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => {
  const { children, className, ...restProps } = props;

  const prefixCls = usePrefixCls('icon-button');
  const classes = classNames(prefixCls, className);

  return <Button ref={ref} className={classes} prefix={children} {...restProps} />;
}) as OverridableComponent<IconButtonTypeMap>;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
IconButton.displayName = 'IconButton';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
IconButton.defaultProps = {
  type: 'primary',
  size: 'normal',
  loading: false,
  disabled: false,
  htmlType: 'button',
};

export default IconButton;
