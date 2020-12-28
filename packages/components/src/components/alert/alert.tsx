import React, { useState } from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import {
  CheckCircleFilled,
  WarningCircleFilled,
  InfoCircleFilled,
  CloseCircleFilled,
  CloseOutlined,
} from '@gio-design/icons';
import { AlertProps } from './interfaces';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';

const Alert: React.FC<AlertProps> = (props: AlertProps) => {
  const prefixCls = usePrefixCls('alert');
  const [alertStatus, setAlertStatus] = useState(true);
  const {
    message,
    description,
    closeable,
    showIcon = false,
    closeText,
    onClose,
    icon,
    type = 'info',
    size = 'middle',
    style,
  } = props;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircleFilled color="#00875A" />;
      case 'warning':
        return <WarningCircleFilled color="#FF991F" />;
      case 'error':
        return <CloseCircleFilled color="#DE350B" />;
      case 'info':
        return <InfoCircleFilled color="#0052CC" />;
      default:
        return showIcon ? icon || <InfoCircleFilled color="#0052CC" /> : null;
    }
  };

  const closeAlert = () => {
    setAlertStatus(false);
    onClose?.();
  };

  return (
    <div>
      <div
        style={style}
        className={classnames(
          prefixCls,
          size === 'small' ? `${prefixCls}-small` : '',
          alertStatus ? `${prefixCls}-${type}` : `${prefixCls}-close`
        )}
      >
        <div className={`${prefixCls}-icon`} style={{ display: showIcon ? 'block' : 'none' }}>
          {getIcon()}
        </div>
        <div className={`${prefixCls}-content`}>
          <div className={`${prefixCls}-content-title`} style={{ display: message ? 'block' : 'none' }}>
            {message || null}
          </div>
          <div className={`${prefixCls}-content-description`} style={{ display: description ? 'block' : 'none' }}>
            {description || null}
          </div>
        </div>
        <div
          className={`${prefixCls}-closeIcon`}
          style={{ display: closeable ? 'block' : 'none' }}
          onClick={closeAlert}
          role="button"
          tabIndex={0}
          onKeyPress={_.noop}
        >
          {closeText || <CloseOutlined />}
        </div>
      </div>
    </div>
  );
};

export default Alert;
