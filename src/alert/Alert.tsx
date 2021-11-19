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
import IconButton from '../button/IconButton';
import { AlertProps } from './interfaces';

export const Alert: React.FC<AlertProps> = ({
  message,
  description,
  closeable,
  showIcon = false,
  onClose,
  icon,
  type = 'info',
  style,
}: AlertProps) => {
  const prefixCls = usePrefixCls('alert-new');
  const [alertStatus, setAlertStatus] = useState(true);

  const getIcon = () => {
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
        return icon || <InfoCircleFilled />;
    }
  };

  const closeAlert = () => {
    setAlertStatus(false);
    onClose?.();
  };

  return alertStatus ? (
    <div style={style} className={classnames(prefixCls, `${prefixCls}-${type}`)}>
      {showIcon && <div className={classnames(`${prefixCls}-icon`)}>{getIcon()}</div>}
      <div className={classnames(showIcon ? null : `${prefixCls}-content-no-icon`, `${prefixCls}-content`)}>
        {message && <div className={classnames(`${prefixCls}-content-title`)}>{message}</div>}
        {message && description && <div className={classnames(`${prefixCls}-content-gap`)} />}
        {description && <div className={classnames(`${prefixCls}-content-description`)}>{description}</div>}
      </div>
      {closeable && (
        <IconButton
          className={classnames(`${prefixCls}-closeButton`)}
          onClick={closeAlert}
          tabIndex={0}
          onKeyPress={_.noop}
          type="text"
          size="small"
        >
          <CloseOutlined />
        </IconButton>
      )}
    </div>
  ) : null;
};

export default Alert;
