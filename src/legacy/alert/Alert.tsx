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
import { PaletteGreen7, PaletteYellow7, PaletteRed5, PaletteBlue6 } from '@gio-design/tokens';
import useSize from '../../utils/hooks/useSize';
import { AlertProps } from './interfaces';

export const Alert: React.FC<AlertProps> = (props: AlertProps) => {
  const prefixCls = usePrefixCls('alert-legacy');
  const [alertStatus, setAlertStatus] = useState(true);
  const { message, description, closeable, showIcon = false, onClose, icon, type, size: customizeSize, style } = props;

  const size = useSize();
  const mergedSize = customizeSize ?? size;
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircleFilled color={PaletteGreen7} />;
      case 'warning':
        return <WarningCircleFilled color={PaletteYellow7} />;
      case 'error':
        return <CloseCircleFilled color={PaletteRed5} />;
      case 'info':
        return <InfoCircleFilled color={PaletteBlue6} />;
      default:
        return icon || <InfoCircleFilled color={PaletteBlue6} />;
    }
  };

  const closeAlert = () => {
    setAlertStatus(false);
    onClose?.();
  };

  return alertStatus ? (
    <div style={style} className={classnames(prefixCls, `${prefixCls}-${mergedSize}`, `${prefixCls}-${type}`)}>
      {showIcon && <div className={classnames(`${prefixCls}-icon`)}>{getIcon()}</div>}
      <div className={classnames(`${prefixCls}-content`)}>
        {message && <div className={classnames(`${prefixCls}-content-title`)}>{message}</div>}
        {description && <div className={classnames(`${prefixCls}-content-description`)}>{description}</div>}
      </div>
      {closeable && (
        <div
          className={classnames(`${prefixCls}-closeIcon`)}
          onClick={closeAlert}
          role="button"
          tabIndex={0}
          onKeyPress={_.noop}
        >
          <CloseOutlined />
        </div>
      )}
    </div>
  ) : null;
};

export default Alert;
