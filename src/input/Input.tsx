import React, { useMemo } from 'react';
import classNames from 'classnames';
import { InputProps } from './interface';
import usePrefixCls from '../utils/hooks/use-prefix-cls';

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    size,
    prefix: customizePrefix,
    prefixCls: customizePrefixCls,
    suffix: customizeSuffix,
    disabled,
    className,
    placeholder,
    ...rest
  } = props;

  const prefixCls = usePrefixCls('input-new', customizePrefixCls);

  const inputClass = useMemo(
    () =>
      classNames(prefixCls, className, {
        [`${prefixCls}__disabled`]: disabled,
        [`${prefixCls}__small`]: size === 'small',
      }),
    [prefixCls, className, size, disabled]
  );

  const wrapper = useMemo(
    () =>
      classNames({
        [`${prefixCls}__suffix-wrapper`]: !!customizeSuffix,
        [`${prefixCls}__prefix-wrapper`]: !!customizePrefix,
      }),
    [prefixCls, customizeSuffix, customizePrefix]
  );

  const prefixFcCls = useMemo(
    () =>
      classNames(`${prefixCls}__prefix`, {
        [`${prefixCls}__prefix-disabled`]: disabled,
      }),
    [prefixCls, disabled]
  );

  const prefix = useMemo(
    () => (customizePrefix ? <div className={prefixFcCls}>{customizePrefix}</div> : null),
    [prefixFcCls, customizePrefix]
  );

  const suffixCls = useMemo(
    () =>
      classNames(`${prefixCls}__suffix`, {
        [`${prefixCls}__suffix-disabled`]: disabled,
      }),
    [prefixCls, disabled]
  );

  const suffix = useMemo(
    () => (customizeSuffix ? <div className={suffixCls}>{customizeSuffix}</div> : null),
    [suffixCls, customizeSuffix]
  );

  const input = (
    <input {...rest} disabled={disabled} className={inputClass} placeholder={placeholder || '请输入...'} ref={ref} />
  );

  if (!suffix && !prefix) {
    return input;
  }

  return (
    <span className={wrapper}>
      {prefix}
      {input}
      {suffix}
    </span>
  );
});

export default Input;
