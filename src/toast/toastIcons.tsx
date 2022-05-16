import React, { CSSProperties, ReactElement } from 'react';
import { SuccessFilled, ErrorFilled, WarningFilled, InfoFilled } from '@gio-design/icons';

export const iconStyle: CSSProperties = {};

export interface IIconMap {
  info: ReactElement;
  success: ReactElement;
  warning: ReactElement;
  error: ReactElement;
}
export const getIconMap = (prefixCls: string): IIconMap => ({
  info: (
    <span className={`${prefixCls}-icon`}>
      <InfoFilled color="#1248E9" style={iconStyle} />
    </span>
  ),
  success: (
    <span className={`${prefixCls}-icon`}>
      <SuccessFilled color="#16CB79" style={iconStyle} />
    </span>
  ),
  warning: (
    <span className={`${prefixCls}-icon`}>
      <WarningFilled color="#FAA937" style={iconStyle} />
    </span>
  ),
  error: (
    <span className={`${prefixCls}-icon`}>
      <ErrorFilled color="#EC134B" style={iconStyle} />
    </span>
  ),
});
