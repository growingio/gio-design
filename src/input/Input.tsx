import React, { useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { usePrefixCls } from '@gio-design/utils';
import { InputProps } from './interface';

const Input = React.forwardRef<HTMLSpanElement, InputProps>((props, ref) => {
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
    inputRef: propsInputRef,
    ...rest
  } = props;

  const prefixCls = usePrefixCls('input', customizePrefixCls);
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

  // const handleChange = useCallback(
  //   (e: React.ChangeEvent<HTMLInputElement>) => {
  //     onChange?.(e);
  //   },
  //   [onChange]
  // );

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
    <span className={inputClass} {...rest} style={style} ref={ref}>
      {prefix}
      <input
        data-testid="input"
        {...rest}
        disabled={disabled}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        ref={propsInputRef}
      />
      {suffix}
    </span>
  );
});

export default Input;
