import React, { useMemo } from 'react';
import classNames from 'classnames';
import { CompoundedInput, InputProps } from './interface';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    size,
    prefix: customizePrefix,
    prefixCls: customizePrefixCls,
    suffix: customizeSuffix,
    disabled,
    placeholder,
    ...rest
  } = props;

  const prefixCls = usePrefixCls('input', customizePrefixCls);

  const inputClass = useMemo(
    () =>
      classNames(prefixCls, {
        [`${prefixCls}__disabled`]: disabled,
        [`${prefixCls}__small`]: size === 'small',
      }),
    [prefixCls, size, disabled]
  );

  const wrapper = useMemo(
    () =>
      classNames({
        [`${prefixCls}__suffix-wrapper`]: !!customizeSuffix,
        [`${prefixCls}__prefix-wrapper`]: !!customizePrefix,
      }),
    [customizeSuffix, customizePrefix, prefixCls]
  );

  const prefix = useMemo(
    () => (customizePrefix ? <div className={`${prefixCls}__prefix`}>{customizePrefix}</div> : null),
    [customizePrefix]
  );

  const suffix = useMemo(
    () => (customizeSuffix ? <div className={`${prefixCls}__suffix`}>{customizeSuffix}</div> : null),
    [customizeSuffix, prefixCls]
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
}) as CompoundedInput;

export default Input;
