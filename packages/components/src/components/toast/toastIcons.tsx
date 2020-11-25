import React, { CSSProperties, ReactElement } from 'react';
import { CheckCircleFilled, CloseCircleFilled, WarningFilled, InformationFilled } from '@gio-design/icons';

export const iconStyle: CSSProperties = {
  width: '16px',
  height: '16px',
  verticalAlign: 'text-bottom',
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
      <InformationFilled color="#3867f4" style={iconStyle} />
    </span>
  ),
  success: (
    <span className={`${prefixCls}-icon`}>
      <CheckCircleFilled color="#008a56" style={iconStyle} />
    </span>
  ),
  warning: (
    <span className={`${prefixCls}-icon`}>
      <WarningFilled color="#f8af48" style={iconStyle} />
    </span>
  ),
  error: (
    <span className={`${prefixCls}-icon`}>
      <CloseCircleFilled color="#f21300" style={iconStyle} />
    </span>
  ),
});
