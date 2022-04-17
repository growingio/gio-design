import React from 'react';
import classnames from 'classnames';
import { usePrefixCls } from '@gio-design/utils';
import RcDialog from 'rc-dialog';
import { CloseOutlined } from '@gio-design/icons';
import { DrawerProps } from './interfaces';

export const Drawer: React.FC<DrawerProps> = ({
  prefixCls: customPrefixCls,
  className,
  wrapClassName,
  title,
  onClose,
  closeIcon,
  size = 'fixed',
  fixed = true,
  width,
  maskClosable = true,
  ...restProps
}: DrawerProps) => {
  const prefix = usePrefixCls('drawer', customPrefixCls);
  const wrapperCls = classnames(wrapClassName, `${prefix}__wrapper`);
  const closeCls = classnames(`${prefix}__close`);

  const drawerCls = classnames(className, {
    [`${prefix}-normal`]: width || size === 'normal',
    [`${prefix}-fixed`]: fixed || !width && size === 'fixed',
  });

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClose && typeof onClose === 'function') {
      onClose?.(e);
    }
  };

  return (
    <RcDialog
      data-testid="drawer"
      keyboard
      maskClosable={maskClosable}
      onClose={handleClose}
      prefixCls={prefix}
      className={drawerCls}
      wrapClassName={wrapperCls}
      closable={title !== false}
      closeIcon={closeIcon || <CloseOutlined className={closeCls} />}
      title={title}
      width={width || fixed && 500 || size === 'fixed' && 500 || undefined}
      {...restProps}
    />
  );
};

export default Drawer;
