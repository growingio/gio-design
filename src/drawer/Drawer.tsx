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
  fixed = true,
  width = 500,
  maskClosable = true,
  maskTransitionName,
  transitionName,
  ...restProps
}: DrawerProps) => {
  const prefix = usePrefixCls('drawer', customPrefixCls);
  const closeCls = classnames(`${prefix}__close`);
  const isFixed = fixed === true;
  const drawerCls = classnames(className, `${prefix}-right`, {
    [`${prefix}-normal`]: !isFixed,
    [`${prefix}-fixed`]: isFixed,
  });
  const getTransitionName = (rootPrefixCls: string, motion: string, _transitionName?: string) => {
    if (_transitionName !== undefined) {
      return _transitionName;
    }
    return `${rootPrefixCls}-${motion}`;
  };

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClose?.(e);
  };

  return (
    <RcDialog
      data-testid="drawer"
      keyboard
      maskClosable={maskClosable}
      onClose={handleClose}
      prefixCls={prefix}
      className={drawerCls}
      transitionName={getTransitionName(prefix, 'slide-fade', transitionName)}
      maskAnimation={maskTransitionName ?? 'fade'}
      wrapClassName={wrapClassName}
      closeIcon={closeIcon || <CloseOutlined className={closeCls} />}
      title={title}
      width={isFixed ? width : undefined}
      {...restProps}
    />
  );
};

export default Drawer;
