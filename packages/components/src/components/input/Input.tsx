import * as React from 'react';
import { InputProps } from './types';

export const prefixCls = 'gio-input';

const Input: React.FC<InputProps> = ({
  value,
  type,
  onChange,
  onPressEnter,
  disabled = false,
  maxLength,
  allowClear,
  errorMsg = '',
  label = '',
  showExpand = false,
  placeholder = '',
  inputStyle,
  ...inputProps
}) => {
  const handleOnPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13 && onPressEnter) {
      onPressEnter(e);
    }
  };

  const renderLabel = () => <div className={`${prefixCls}-label`}></div>;

  const renderContent = () => (
    <input
      className={`${prefixCls}-content`}
      type={type}
      disabled={disabled}
      maxLength={maxLength}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onKeyDown={handleOnPressEnter}
      style={inputStyle}
      {...inputProps}
    />
  );

  const renderExpand = () => (
    <div className={`${prefixCls}-expand`}>
      <div className={`${prefixCls}-expand-error`}>{errorMsg}</div>
      <div></div>
    </div>
  );

  return (
    <div>
      {!!label && renderLabel()}
      {renderContent()}
      {showExpand && renderExpand()}
    </div>
  );
};

export default Input;
