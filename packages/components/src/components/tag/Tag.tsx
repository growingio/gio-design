import React, { useContext } from 'react';
import { Close } from '@gio-design/icons';
import classnames from 'classnames';
import { TagProps } from './interface';
import { ConfigContext } from '../config-provider';

export const isToggleClose = (closable = false, persistCloseIcon = false): boolean => closable && !persistCloseIcon;

const Tag: React.FC<TagProps & React.HTMLAttributes<HTMLSpanElement>> = (props: TagProps) => {
  const {
    children,
    type = 'normal',
    size = 'middle',
    status,
    color,
    closable,
    onClose,
    onClick,
    disabled,
    persistCloseIcon = true,
    className,
    customizePrefixCls,
    style,
  } = props;
  const { getPrefixCls } = useContext(ConfigContext);
  const prefix = getPrefixCls('tag', customizePrefixCls);

  return (
    <span
      className={classnames(
        prefix,
        classnames({ [`${prefix}-size-${size}`]: size }),
        classnames({ [`${prefix}-type-${type}`]: type }),
        classnames({ [`${prefix}-status-${status}`]: status }),
        classnames({ [`${prefix}-color-${color}`]: color }),
        classnames({ [`${prefix}-closable`]: closable }),
        classnames({ [`${prefix}-closable-toggle`]: isToggleClose(closable, persistCloseIcon) }),
        classnames({ [`${prefix}-closable-disabled`]: disabled }),
        className
      )}
      aria-hidden="true"
      onClick={onClick}
      style={style}
    >
      <span className={`${prefix}-label`}>{children}</span>
      {closable && !disabled ? <Close className={`${prefix}-closable-icon`} onClick={onClose} /> : null}
    </span>
  );
};

export default Tag;
