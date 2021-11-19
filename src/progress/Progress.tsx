import React from 'react';
import { CheckCircleFilled, CloseCircleFilled } from '@gio-design/icons';
import classNames from 'classnames';
import { usePrefixCls } from '@gio-design/utils';
import { ProgressProps, ProgressStatus } from './interface';

const defaultFormat = (percent?: number) => `${Math.round((percent || 0) * 100) / 100}%`;
const statusIcons = [null, CheckCircleFilled, CloseCircleFilled];

const getStatusIcon = (status: string, prefix: string) => {
  const Icon = statusIcons[ProgressStatus[status as keyof typeof ProgressStatus]];
  return Icon && <Icon className={`${prefix}-${status}-icon`} />;
};

const Progress: React.FC<ProgressProps> = ({
  percent,
  status = 'active',
  format = defaultFormat,
  customizePrefixCls,
  animation,
  className,
  style,
  showInfo = true,
  size = 'default',
}: ProgressProps) => {
  const prefixCls = usePrefixCls('progress-new', customizePrefixCls);

  return (
    <div className={prefixCls} style={style}>
      <div className={classNames(`${prefixCls}-trail`, `${prefixCls}-${size}`, className)}>
        <div
          className={classNames(`${prefixCls}-stroke`, `${prefixCls}-${status}`, {
            [`${prefixCls}-animate`]: animation,
          })}
          style={{ width: `${percent}%` }}
        />
      </div>
      {showInfo ? (
        <div className={`${prefixCls}-info`}>
          <span className={`${prefixCls}-text`}>{format(percent)}</span>
          <span className={`${prefixCls}-icon`}>{getStatusIcon(status, prefixCls)}</span>
        </div>
      ) : null}
    </div>
  );
};

export default Progress;
