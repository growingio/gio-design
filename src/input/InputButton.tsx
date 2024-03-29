import { ErrorFilled, DownFilled, LoadingTwoTone } from '@gio-design/icons';
import { usePrefixCls } from '@gio-design/utils';
import classNames from 'classnames';
import React, { useCallback, useMemo } from 'react';
import useControlledState from '../utils/hooks/useControlledState';
import Input from './Input';
import { InputButtonProps } from './interface';

const InputButton = React.forwardRef<HTMLInputElement, InputButtonProps>((props, ref) => {
  const {
    size,
    prefixCls: customizePrefixCls,
    prefix: customizePrefix,
    suffix: customizeSuffix,
    onInputChange: onInputUpdate,
    onChange: onChangeEvent,
    placeholder,
    defaultValue,
    value: enterValue,
    disabled,
    allowClear = false,
    className,
    style = {},
    maxWidth,
    active = false,
    onClear: handleOnClear,
    loading,
    ...rest
  } = props;

  const prefixCls = usePrefixCls('input-btn', customizePrefixCls);
  const inputCls = usePrefixCls('input-btn__input', customizePrefixCls);

  const [value, setValue] = useControlledState(enterValue, defaultValue);

  const onInputChange = useCallback(
    (val: string) => {
      onInputUpdate?.(val);
      onChangeEvent?.(val);
    },
    [onInputUpdate, onChangeEvent]
  );

  const onClear = useCallback(
    (event: React.MouseEvent<Element, MouseEvent>) => {
      handleOnClear?.(event);
      onInputChange('');
      setValue('');
      event.stopPropagation();
    },
    [handleOnClear, onInputChange, setValue]
  );

  const wrapperCls = useMemo(
    () =>
      classNames(className, prefixCls, {
        [`${prefixCls}__disabled`]: disabled,
        [`${prefixCls}__active`]: active,
        [`${prefixCls}__loading`]: loading,
      }),
    [className, prefixCls, disabled, active, loading]
  );

  const suffix = useMemo(() => {
    const hideClear = allowClear === false;
    const { onClick } = rest;
    if (loading) {
      return customizeSuffix || <LoadingTwoTone rotating />;
    }
    const defaultSuffix =
      value && !hideClear && !disabled ? (
        <ErrorFilled onClick={onClear} data-testid="clean-button" />
      ) : (
        <DownFilled onClick={onClick} />
      );
    return customizeSuffix || defaultSuffix;
  }, [customizeSuffix, value, onClear, allowClear, disabled, rest, loading]);

  const styles = maxWidth ? { maxWidth } : {};

  return (
    <Input
      data-testid="input-button"
      {...rest}
      style={{ ...style, ...styles }}
      className={classNames(inputCls, wrapperCls)}
      type="button"
      // when set Input type=button, the placeholder is invalid
      value={value || placeholder}
      title={value as string}
      prefix={customizePrefix}
      suffix={suffix}
      ref={ref}
      size={size}
      disabled={disabled}
    />
  );
});

InputButton.displayName = 'InputButton';

export default InputButton;
