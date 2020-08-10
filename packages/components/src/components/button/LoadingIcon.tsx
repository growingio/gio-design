import * as React from 'react';
import Icon from '@gio-design/icon';

export interface LoadingIconProps {
  prefixCls: string;
  existIcon: boolean;
  loading?: boolean;
}

export default function LoadingIcon({ prefixCls, loading, existIcon }: LoadingIconProps) {
  if (existIcon) {
    return (
      <span className={`${prefixCls}-loading-icon`}>
        <Icon type="reload" />
      </span>
    );
  }
  if (loading) {
    return (
      <span className={`${prefixCls}-loading-icon`}>
        <Icon type="reload" />
      </span>
    );
  }
  return null;
}
