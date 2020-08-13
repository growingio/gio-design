import * as React from 'react';
import BaseInput, { prefixCls } from './BaseInput';
import { InputProps } from './types';

const InputHidden: React.FC<InputProps> = ({
  value,
  type = 'text',
  onChange,
  onPressEnter,
  disabled = false,
  maxLength,
  placeholder = '',
  inputStyle,

  errorMsg = '',
  label = '',
  wrapStyle,
  onOk,
  onCancel,

  ...restInputProps
}) => {
  const [contentClass, setContentClass] = React.useState(`${prefixCls}-content-hidden`);
  const [showOpt, setAllowClear] = React.useState(false);

  React.useEffect(() => {
    if (errorMsg) {
      setContentClass(`${prefixCls}-content-error`);
    } else if (showOpt) {
      setContentClass(`${prefixCls}-content`);
    } else {
      setContentClass(`${prefixCls}-content-hidden`);
    }
  }, [errorMsg, showOpt]);

  const handleOnPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13 && onPressEnter) {
      onPressEnter(e);
    }
  };

  const handleOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setAllowClear(true);
    if (restInputProps.onFocus) {
      restInputProps.onFocus(e);
    }
  };

  const handleOnOk = () => {
    setAllowClear(false);
    onOk?.();
  };

  const handleOnCancel = () => {
    setAllowClear(false);
    onCancel?.();
  };

  return (
    <BaseInput
      showOpt={showOpt}
      onOk={handleOnOk}
      onCancel={handleOnCancel}
      errorMsg={errorMsg}
      label={label}
      wrapStyle={wrapStyle}
    >
      <input
        type={type}
        onFocus={handleOnFocus}
        value={value}
        onChange={onChange}
        onKeyDown={handleOnPressEnter}
        disabled={disabled}
        maxLength={maxLength}
        placeholder={placeholder}
        style={inputStyle}
        className={contentClass}
        {...restInputProps}
      />
    </BaseInput>
  );
};

export default InputHidden;
