import React, { useContext } from 'react';
import { TagProps, TagTypeKey, TagColor, TagStatusKey, TagStatus } from './interface';
import { ConfigContext } from '../config-provider';
import { Close } from '@gio-design/icons';
import classnames from 'classnames';

export const isProrupt = (type?: TagTypeKey, closable = false) => type === 'prorupt' || closable;

export const isLarge = (type?: TagTypeKey) => type === 'large';

export const isPredifinedColor = (color?: string) => Object.keys(TagColor).includes(color || '');

export const isPredifinedStatus = (type?: string) => Object.keys(TagStatus).includes(type || '');

export const isPersistClose = (closable = false, persistCloseIcon = false) => closable && persistCloseIcon;

export const getTypeClass = (prefix = 'tag', type?: TagTypeKey, closable = false) =>
  classnames({ [`${prefix}-prorupt`]: isProrupt(type, closable), [`${prefix}-large`]: isLarge(type) });

export const getStatusClass = (prefix = 'tag', status?: TagStatusKey) =>
  classnames({ [`${prefix}-status-${status}`]: isPredifinedStatus(status) });

export const getColorClass = (prefix = 'tag', color?: string) =>
  classnames({ [`${prefix}-color-${color}`]: isPredifinedColor(color) });

export const getDeleteToggleClass = (prefix = 'tag', isPersistClose = true) =>
  classnames({ [`${prefix}-delete-toggle`]: !isPersistClose });

export const getDisabledClass = (prefix = 'tag', disabled = false) => classnames({ [`${prefix}-disabled`]: disabled });

const Tag: React.FC<TagProps & React.HTMLAttributes<HTMLSpanElement>> = (props) => {
  const {
    children,
    type,
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
        getTypeClass(prefix, type, closable),
        getStatusClass(prefix, status),
        getColorClass(prefix, color),
        getDeleteToggleClass(prefix, isPersistClose(closable, persistCloseIcon)),
        getDisabledClass(prefix, disabled),
        className
      )}
      {...restProps}
    >
      {children}
      {closable && !disabled ? <Close className={`${prefix}-close`} onClick={onClose} /> : null}
    </span>
  );
};

export default Tag;
