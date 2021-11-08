import React from 'react';
import classnames from 'classnames';
import { usePrefixCls } from '@gio-design/utils';
import Button from '../button';
import { InnerRangePanelProps } from './interfaces';

function InnerRangePanel({ disableOK, header, body, onOK, onCancel }: InnerRangePanelProps) {
  const prefixCls = usePrefixCls('range-panel');
  const cls = classnames(prefixCls);

  return (
    <div className={cls}>
      <div className={`${prefixCls}__header`}>{header}</div>
      <div className={`${prefixCls}__divider`} />
      <div className={`${prefixCls}__body`}>{body}</div>
      <div className={`${prefixCls}__footer`}>
        <Button onClick={onCancel} type="secondary" size="small">
          取消
        </Button>
        <Button disabled={disableOK} onClick={onOK} size="small">
          确定
        </Button>
      </div>
    </div>
  );
}

export default InnerRangePanel;
