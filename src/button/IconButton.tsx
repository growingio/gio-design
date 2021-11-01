import React from 'react';
import classNames from 'classnames';
import { IconButtonProps } from './interface';
import Button from './Button';
import usePrefixCls from '../utils/hooks/use-prefix-cls';

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => {
  const { children, className, ...restProps } = props;

  const prefixCls = usePrefixCls('icon-button-new');
  const classes = classNames(prefixCls, className);

  return <Button ref={ref} className={classes} prefix={children} {...restProps} />;
});

IconButton.displayName = 'IconButton';

IconButton.defaultProps = {
  ...Button.defaultProps,
};

export default IconButton;
