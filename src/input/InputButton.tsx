import { CloseCircleFilled, DownFilled, EventsPresetOutlined } from '@gio-design/icons';
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
    onInputChange,
    placeholder,
    defaultValue,
    value: enterValue,
    disabled,
    hidePrefix = false,
    allowClear,
    className,
    style = {},
    maxWidth,
    ...rest
  } = props;

  const prefixCls = usePrefixCls('input-btn-new', customizePrefixCls);
  const inputCls = usePrefixCls('input-btn-new__input', customizePrefixCls);

  const [value, setValue] = useControlledState(enterValue, defaultValue);

  const onClear = useCallback(() => {
    if (disabled) {
      return;
    }
    onInputChange?.('');
    setValue('');
  }, [onInputChange, disabled, setValue]);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      onInputChange?.(inputValue);
      setValue(inputValue);
    },
    [onInputChange, setValue]
  );

  const wrapperCls = useMemo(
    () => classNames(className, prefixCls, { [`${prefixCls}__disabled`]: disabled }),
    [className, prefixCls, disabled]
  );

  const prefix = useMemo(
    () => (hidePrefix ? null : customizePrefix || <EventsPresetOutlined />),
    [customizePrefix, hidePrefix]
  );

  const suffix = useMemo(() => {
    const hideClear = allowClear === false;
    const defaultSuffix = value && !hideClear && !disabled ? <CloseCircleFilled onClick={onClear} /> : <DownFilled />;
    return customizeSuffix || defaultSuffix;
  }, [customizeSuffix, value, onClear, allowClear, disabled]);

  const styles = maxWidth ? { maxWidth } : {};

  return (
    <span className={wrapperCls}>
      <Input
        {...rest}
        style={{ ...style, ...styles }}
        className={inputCls}
        type="button"
        value={value || placeholder}
        onChange={onChange}
        prefix={prefix}
        suffix={suffix}
        ref={ref}
        size={size}
        disabled={disabled}
      />
    </span>
  );
});

export default InputButton;
