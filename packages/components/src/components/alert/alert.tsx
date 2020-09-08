import React, { ReactNode, useState } from 'react';
import classnames from 'classnames';

import { CheckCircleFilled, WarningFilled, InformationFilled, CloseCircleFilled, Close } from '@gio-design/icons';

interface AlertProps {
  afterClose?: any;
  // banner?: boolean;
  closeable?: boolean;
  colseText?: string | ReactNode;
  description?: string | ReactNode;
  icon?: ReactNode;
  message?: string | ReactNode;
  showIcon?: boolean;
  type?: string;
  onClose?: any;
  size?: string;
}

const Alert: React.FC<AlertProps> = (props: AlertProps) => {
  const [alertStatus, setAlertStatus] = useState(true);
  const { message, description, closeable, showIcon, colseText, onClose, icon, type = 'info', size = 'middle' } = props;

  const getIcon = () => {
    const { type } = props;
    switch (type) {
      case 'success':
        return <CheckCircleFilled />;
      case 'warning':
        return <WarningFilled />;
      case 'error':
        return <CloseCircleFilled />;
      default:
        return <InformationFilled />;
    }
  };

  const closeAlert = () => {
    setAlertStatus(false);
    onClose?.();
  };

  return (
    <div>
      <div
        className={classnames(
          'gio-alert',
          size === 'small' ? 'gio-alert-small' : '',
          alertStatus ? `gio-alert-${type}` : 'gio-alert-close'
        )}
      >
        <div className="gio-alert-icon" style={{ display: showIcon ? 'block' : 'none' }}>
          {icon || getIcon()}
        </div>
        <div className="gio-alert-content">
          <div className="gio-alert-content-title" style={{ display: message ? 'block' : 'none' }}>
            {message || null}
          </div>
          <div className="gio-alert-content-description" style={{ display: description ? 'block' : 'none' }}>
            {description || null}
          </div>
        </div>
        <div className="gio-alert-closeIcon" style={{ display: closeable ? 'block' : 'none' }} onClick={closeAlert}>
          {colseText || <Close />}
        </div>
      </div>
    </div>
  );
};

export default Alert;
