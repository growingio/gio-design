import React, { useContext } from 'react';
import { TagProps } from './interface';
import { ConfigContext } from '../config-provider';
import { Close } from '@gio-design/icons';
import classnames from 'classnames';

export const isToggleClose = (closable = false, persistCloseIcon = false) => closable && !persistCloseIcon;

const Tag: React.FC<TagProps & React.HTMLAttributes<HTMLSpanElement>> = (props) => {
  const {
    children,
    type = 'normal',
    size = 'medium',
    status,
    color,
    closable,
    onClose,
    disabled,
    persistCloseIcon = true,
    className,
    customizePrefixCls,
    ...restProps
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
      {...restProps}
    >
      {children}
      {closable && !disabled ? <Close className={`${prefix}-closable-icon`} onClick={onClose} /> : null}
    </span>
  );
};

export default Tag;
