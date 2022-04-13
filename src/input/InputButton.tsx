import { CloseCircleFilled, DownFilled } from '@gio-design/icons';
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
      if (disabled) {
        return;
      }
      handleOnClear?.(event);
      onInputChange?.('');
      setValue('');
      event.stopPropagation();
    },
    [disabled, handleOnClear, onInputChange, setValue]
  );

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      onInputChange?.(inputValue);
      setValue(inputValue);
    },
    [onInputChange, setValue]
  );

  const wrapperCls = useMemo(
    () =>
      classNames(className, prefixCls, {
        [`${prefixCls}__disabled`]: disabled,
        [`${prefixCls}__active`]: active,
      }),
    [className, prefixCls, disabled, active]
  );

  const suffix = useMemo(() => {
    const hideClear = allowClear === false;
    const { onClick } = rest;
    const defaultSuffix =
      value && !hideClear && !disabled ? <CloseCircleFilled onClick={onClear} /> : <DownFilled onClick={onClick} />;
    return customizeSuffix || defaultSuffix;
  }, [customizeSuffix, value, onClear, allowClear, disabled, rest]);

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
      onChange={onChange}
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
