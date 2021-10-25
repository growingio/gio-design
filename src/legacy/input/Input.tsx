import React, { useMemo } from 'react';
import classNames from 'classnames';
import { CompoundedInput, InputProps } from './interface';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { size, prefixCls: customizePrefixCls, suffix, disabled, placeholder, ...rest } = props;

  const prefixCls = usePrefixCls('input', customizePrefixCls);

  const inputClass = useMemo(
    () =>
      classNames(prefixCls, {
        [`${prefixCls}__disabled`]: disabled,
        [`${prefixCls}__small`]: size === 'small',
      }),
    [prefixCls, size, disabled]
  );

  const inputSuffix = useMemo(
    () => (suffix ? <div className={`${prefixCls}__suffix`}>{suffix}</div> : null),
    [suffix, prefixCls]
  );

  const wrapper = useMemo(
    () =>
      classNames({
        [`${prefixCls}-wrapper`]: !!suffix,
      }),
    [suffix, prefixCls]
  );

  const input = (
    <input {...rest} disabled={disabled} className={inputClass} placeholder={placeholder || '请输入...'} ref={ref} />
  );

  if (!inputSuffix) {
    return input;
  }

  return (
    <span className={wrapper}>
      {input}
      {inputSuffix}
    </span>
  );
}) as CompoundedInput;

export default Input;
