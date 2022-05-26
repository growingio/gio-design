import React from 'react';
import classNames from 'classnames';
import { usePrefixCls } from '@gio-design/utils';
import { IconButtonProps } from './interface';
import Button from './Button';

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => {
  const { children, className, ...restProps } = props;

  const prefixCls = usePrefixCls('icon-button');
  const classes = classNames(prefixCls, className);

  return <Button ref={ref} className={classes} prefix={children} {...restProps} />;
});

export const ICON_BUTTON_DISPLAY_NAME = 'IconButton';

IconButton.displayName = ICON_BUTTON_DISPLAY_NAME;

export default IconButton;
