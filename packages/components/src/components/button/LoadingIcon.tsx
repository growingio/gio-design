import * as React from 'react';
import { ButtonType } from './interface';
import { LoadingBlackOutlined, LoadingWhiteOutlined } from '@gio-design/icons';

export interface LoadingIconProps {
  prefixCls: string;
  existIcon: boolean;
  loading?: boolean;
  type?: ButtonType;
}

export default function LoadingIcon({ prefixCls, loading, existIcon, type }: LoadingIconProps) {
  let loadingIcon;
  if (type === 'primary') {
    loadingIcon = <LoadingWhiteOutlined />;
  } else {
    loadingIcon = <LoadingBlackOutlined />;
  }

  if (existIcon || loading) {
    return <span className={`${prefixCls}-loading-icon`}>{loadingIcon}</span>;
  }
  return null;
}
