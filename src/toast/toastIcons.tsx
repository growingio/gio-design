import React, { CSSProperties, ReactElement } from 'react';
import { CheckCircleFilled, CloseCircleFilled, WarningCircleFilled, InfoCircleFilled } from '@gio-design/icons';

export const iconStyle: CSSProperties = {
  width: '16px',
  height: '20px',
  verticalAlign: 'middle',
};

export interface IIconMap {
  info: ReactElement;
  success: ReactElement;
  warning: ReactElement;
  error: ReactElement;
}
export const getIconMap = (prefixCls: string): IIconMap => ({
  info: (
    <span className={`${prefixCls}-icon`}>
      <InfoCircleFilled color="#3867f4" style={iconStyle} />
    </span>
  ),
  success: (
    <span className={`${prefixCls}-icon`}>
      <CheckCircleFilled color="#008a56" style={iconStyle} />
    </span>
  ),
  warning: (
    <span className={`${prefixCls}-icon`}>
      <WarningCircleFilled color="#f8af48" style={iconStyle} />
    </span>
  ),
  error: (
    <span className={`${prefixCls}-icon`}>
      <CloseCircleFilled color="#f21300" style={iconStyle} />
    </span>
  ),
});
