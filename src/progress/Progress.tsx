import React from 'react';
import { SuccessFilled, ErrorFilled } from '@gio-design/icons';
import classNames from 'classnames';
import { usePrefixCls } from '@gio-design/utils';
import { ProgressProps, ProgressStatus } from './interface';
import ProgressCircle from './ProgressCircle';

export const defaultFormat = (percent?: number) => `${Math.round((percent || 0) * 100) / 100}%`;
const statusIcons = [null, SuccessFilled, ErrorFilled];

const getStatusIcon = (status: string, prefix: string) => {
  const Icon = statusIcons[ProgressStatus[status as keyof typeof ProgressStatus]];
  return Icon && <Icon className={`${prefix}-${status}-icon`} />;
};

const Progress: React.FC<ProgressProps> = (props) => {
  const {
    percent = 0,
    status = 'active',
    format = defaultFormat,
    customizePrefixCls,
    animation,
    className,
    style,
    showInfo = true,
    size = 'default',
    type,
    ...rest
  } = props;
  const prefixCls = usePrefixCls('progress', customizePrefixCls);

  if (type === 'circle') {
    return <ProgressCircle {...props} />;
  }

  const fixedSize = size === 'large' ? 'default' : size;

  return (
    <div data-testid="progress" className={prefixCls} style={style} {...rest}>
      <div className={classNames(`${prefixCls}-trail`, `${prefixCls}-${fixedSize}`, className)}>
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
