import React from 'react';
import classnames from 'classnames';
import { usePrefixCls, useLocale } from '@gio-design/utils';
import Button from '../button';
import defaultLocale from './locales/zh-CN';
import { InnerRangePanelProps } from './interfaces';

function InnerRangePanel({ disableOK, header, body, onOK, onCancel }: InnerRangePanelProps) {
  const prefixCls = usePrefixCls('range-panel');
  const cls = classnames(prefixCls);

  const locale = useLocale('StaticPastTimePicker');

  const { okText, closeText } = {
    ...defaultLocale,
    ...locale,
  };

  return (
    <div className={cls}>
      <div className={`${prefixCls}__header`}>{header}</div>
      <div className={`${prefixCls}__divider`} />
      <div className={`${prefixCls}__body`}>{body}</div>
      <div className={`${prefixCls}__footer`}>
        <Button onClick={onCancel} type="secondary" size="small">
          {closeText}
        </Button>
        <Button disabled={disableOK} onClick={onOK} size="small">
          {okText}
        </Button>
      </div>
    </div>
  );
}

export default InnerRangePanel;
