import React, { useCallback, useMemo } from 'react';
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
    onPressEnter,
    onKeyPress,
    style,
    value,
    ...rest
  } = props;

  const prefixCls = usePrefixCls('input-new', customizePrefixCls);

  const inputClass = useMemo(
    () =>
      classNames(
        className,
        {
          [`${prefixCls}__hover`]: !disabled,
          [`${prefixCls}__disabled`]: disabled,
          [`${prefixCls}__small`]: size === 'small',
        },
        prefixCls
      ),
    [prefixCls, className, size, disabled]
  );

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onPressEnter?.(e);
      }
      onKeyPress?.(e);
    },
    [onPressEnter, onKeyPress]
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
  return (
    <span className={inputClass} {...rest} style={style}>
      {prefix}
      <input
        {...rest}
        value={value ?? ''}
        disabled={disabled}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        ref={ref}
      />
      {suffix}
    </span>
  );
});

export default Input;
