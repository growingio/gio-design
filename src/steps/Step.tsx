import { CheckOutlined } from '@gio-design/icons';
import { usePrefixCls } from '@gio-design/utils';
import classnames from 'classnames';
import React, { useMemo } from 'react';
import { StepProps } from './interface';

const Step = (props: StepProps & { stepIndex?: number; active?: number }) => {
  const { title, status, prefix, onClick, disabled = false, className, stepIndex = 1, active } = props;
  const prefixCls = usePrefixCls('steps-item');
  const cls = classnames(`${prefixCls}`, className, `${prefixCls}-${status}`, {
    [`${prefixCls}-active`]: active,
    [`${prefixCls}-disabled`]: disabled,
  });

  const stepIcon = useMemo(() => {
    if (!React.isValidElement(prefix) && status === 'finish') {
      return <CheckOutlined className={`${prefixCls}-finish-icon`} />;
    }
    return prefix;
  }, [prefix, status, prefixCls]);
  return (
    <button
      className={cls}
      disabled={disabled}
      type="button"
      data-testid={`step-${stepIndex}`}
      value={stepIndex}
      tabIndex={onClick && !disabled ? 0 : undefined}
      onClick={() => onClick?.(stepIndex)}
    >
      <span
        className={classnames(`${prefixCls}-prefix`, {
          [`${prefixCls}-prefix-none`]: !stepIcon,
          [`${prefixCls}-prefix-only`]: !title,
        })}
      >
        {stepIcon}
      </span>
      {title}
    </button>
  );
};
export default Step;
