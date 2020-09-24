import React, { useContext, useRef } from 'react';
import { Close } from '@gio-design/icons';
import classnames from 'classnames';
import { TagProps } from './interface';
import { ConfigContext } from '../config-provider';

export const isToggleClose = (closable = false, persistCloseIcon = false): boolean => closable && !persistCloseIcon;

const Tag: React.FC<TagProps & React.HTMLAttributes<HTMLSpanElement>> = (props: TagProps) => {
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
  const closeEl = useRef<HTMLSpanElement>(null);

  const onCloseClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    if (closeEl.current?.contains(e.target as Node) && onClose) {
      onClose(e);
    }
  };
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
      onClick={onCloseClick}
      {...restProps}
    >
      <span className={`${prefix}-label`}>{children}</span>
      {closable && !disabled ? (
        <span ref={closeEl}>
          <Close className={`${prefix}-closable-icon`} />
        </span>
      ) : null}
    </span>
  );
};

export default Tag;
