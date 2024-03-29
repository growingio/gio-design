import React from 'react';
import { CloseOutlined } from '@gio-design/icons';
import classnames from 'classnames';
import { usePrefixCls } from '@gio-design/utils';
import { TagProps } from './interface';

const Tag: React.FC<TagProps> = ({
  children,
  type = 'normal',
  size = 'middle',
  status,
  closable,
  onClose,
  onClick,
  disabled,
  className,
  customizePrefixCls,
  style,
  ...restProps
}: TagProps) => {
  const prefix = usePrefixCls('tag', customizePrefixCls);

  return (
    <span
      className={classnames(
        prefix,
        classnames({ [`${prefix}-size-${size}`]: size }),
        classnames({ [`${prefix}-type-${type}`]: type }),
        classnames({ [`${prefix}-status-${status}`]: status }),
        classnames({ [`${prefix}-closable`]: closable }),
        classnames({ [`${prefix}-closable-disabled`]: disabled }),
        className
      )}
      aria-hidden="true"
      onClick={onClick}
      style={style}
      data-testid="tag"
      {...restProps}
    >
      <span className={`${prefix}-label`}>{children}</span>
      {closable && !disabled ? <CloseOutlined className={`${prefix}-closable-icon`} onClick={onClose} /> : null}
    </span>
  );
};

export default Tag;
