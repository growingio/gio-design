import React, { useState } from 'react';
import classnames from 'classnames';
import { usePrefixCls } from '@gio-design/utils';
import _ from 'lodash';
import {
  CheckCircleFilled,
  WarningCircleFilled,
  InfoCircleFilled,
  CloseCircleFilled,
  CloseOutlined,
} from '@gio-design/icons';
import Button from '../button';
import { AlertProps } from './interfaces';

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    { message, description, closeable, showIcon = false, onClose, icon, type = 'info', className, ...restProps },
    ref
  ) => {
    const prefixCls = usePrefixCls('alert');
    const [alertStatus, setAlertStatus] = useState(true);

    const getIcon = () => {
      if (icon) return icon;
      switch (type) {
        case 'success':
          return <CheckCircleFilled />;
        case 'warning':
          return <WarningCircleFilled />;
        case 'error':
          return <CloseCircleFilled />;
        case 'info':
          return <InfoCircleFilled />;
        default:
          return <InfoCircleFilled />;
      }
    };

    const closeAlert = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setAlertStatus(false);
      onClose?.(event);
    };

    return alertStatus ? (
      <div
        className={classnames(prefixCls, `${prefixCls}-${type}`, className)}
        data-testid="alert"
        ref={ref}
        {...restProps}
      >
        {showIcon && <div className={classnames(`${prefixCls}-icon`)}>{getIcon()}</div>}
        <div className={classnames(`${prefixCls}-content`, { [`${prefixCls}-content-no-icon`]: !showIcon })}>
          {message && <div className={classnames(`${prefixCls}-content-title`)}>{message}</div>}
          {message && description && <div className={classnames(`${prefixCls}-content-gap`)} />}
          {description && <div className={classnames(`${prefixCls}-content-description`)}>{description}</div>}
        </div>
        {closeable && (
          <Button.IconButton
            className={classnames(`${prefixCls}-closeButton`)}
            onClick={closeAlert}
            tabIndex={0}
            onKeyPress={_.noop}
            type="text"
            size="small"
          >
            <CloseOutlined />
          </Button.IconButton>
        )}
      </div>
    ) : null;
  }
);

export default Alert;
