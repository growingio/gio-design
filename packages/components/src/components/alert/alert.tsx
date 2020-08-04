import React, { ReactNode, useState } from 'react';
import classnames from 'classnames';

import Icon from '@gio-design/icon';
import { CheckCircleFilled,AppFilled } from '@gio-design/icons';

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
}

const Alert: React.FC<AlertProps> = (props) => {
  const [alertStatus, setAlertStatus] = useState(true);
  const { message, description, closeable, showIcon, colseText, onClose, icon } = props;

  const getType = () => {
    const { type } = props;
    switch (type) {
      case 'success':
      case 'info':
      case 'warning':
      case 'error':
        return type;
      default:
        return 'info';
    }
  };

  const getIcon = () => {
    const { type } = props;
    switch (type) {
      case 'success':
        return (<CheckCircleFilled />);
      case 'warning':
        return 'exclamation-circle';
      case 'error':
        return 'close-circle';
      default:
        return 'info-circle';
    }
  };

  const closeAlert = () => {
    setAlertStatus(false);
    onClose && onClose();
  };

  return (
    <div>
      <div className={classnames('gio-alert', alertStatus ? getType() : 'gio-alert-close')}>
        <div className='gio-alert-icon' style={{ display: showIcon ? 'block' : 'none' }}>
          {/* {icon ? icon : <Icon type={getIcon()}></Icon>} */}
          <CheckCircleFilled />
        </div>
        <div className='gio-alert-content'>
          <div
            className='gio-alert-content-title'
            style={{ display: message ? 'block' : 'none', marginBottom: description ? '8px' : '0' }}
          >
            {message ? message : null}
          </div>
          <div className='gio-alert-content-description' style={{ display: description ? 'block' : 'none' }}>
            {description ? description : null}
          </div>
        </div>
        <div className='gio-alert-closeIcon' style={{ display: closeable ? 'block' : 'none' }} onClick={closeAlert}>
          {colseText ? colseText : <Icon type='close'></Icon>}
        </div>
      </div>
    </div>
  );
};

export default Alert;
