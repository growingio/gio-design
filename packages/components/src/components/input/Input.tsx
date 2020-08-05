import * as React from 'react';
import BaseInput, { prefixCls } from './BaseInput';
import { InputProps } from './types';

const Input: React.FC<InputProps> = ({
  value,
  type = 'text',
  onChange,
  onPressEnter,
  disabled = false,
  maxLength,
  placeholder = '',
  inputStyle,

  showOpt,
  errorMsg = '',
  label = '',
  wrapStyle,

  ...restInputProps
}) => {
  const contentClass = React.useMemo(() => `${prefixCls}-content${!!errorMsg ? '-error' : ''}`, [errorMsg]);

  const handleOnPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13 && onPressEnter) {
      onPressEnter(e);
    }
  };

  return (
    <BaseInput showOpt={showOpt} errorMsg={errorMsg} label={label} wrapStyle={wrapStyle}>
      <input
        type={type}
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

export default Input;
