import React from 'react';
import { CloseOutlined } from '@gio-design/icons';
import { useLocale, usePrefixCls } from '@gio-design/utils';
import { IconButton } from '../index';
import { BatchActionProps } from './interfaces';
import defaultLocaleTextObject from './locales/zh-CN';

const BatchActions: React.FC<BatchActionProps> = ({ onClose, count = 0, children }) => {
  const localeTextObject: typeof defaultLocaleTextObject = useLocale('Panel') || defaultLocaleTextObject;
  const prefixCls = usePrefixCls('panel__batch-actions');
  return (
    <div className={prefixCls}>
      <span className={`${prefixCls}__text`}>{localeTextObject.hasSelected(count)}</span>
      <IconButton type="text" size="small" onClick={onClose}>
        <CloseOutlined />
      </IconButton>
      <span className={`${prefixCls}__divider`} />
      <span className={`${prefixCls}__children`}>{children}</span>
    </div>
  );
};

export default BatchActions;
