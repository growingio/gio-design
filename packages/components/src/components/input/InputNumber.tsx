import * as React from 'react';
import BaseInput, { prefixCls } from './BaseInput';
import Button from '../button';
import { UpFilled, DownFilled } from '@gio-design/icons';
import { InputNumberProps } from './types';

const InputNumber: React.FC<InputNumberProps> = ({
  value,
  onChange,
  onPressEnter,
  disabled = false,
  placeholder = '',
  inputStyle,
  max = Number.MAX_SAFE_INTEGER,
  min = -Number.MAX_SAFE_INTEGER,

  showOpt,
  errorMsg = '',
  label = '',
  wrapStyle,

  ...restInputProps
}) => {
  const contentClass = React.useMemo(() => `${prefixCls}-content${errorMsg ? '-error' : ''}`, [errorMsg]);

  const handleOnPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13 && onPressEnter) {
      onPressEnter(e);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (isNaN(value) || value < min || value > max) {
      return;
    }
    onChange(value);
  };

  const handleAdd = () => {
    onChange(value + 1);
  };

  const handleDecrease = () => {
    onChange(value - 1);
  };

  return (
    <BaseInput showOpt={showOpt} errorMsg={errorMsg} label={label} wrapStyle={wrapStyle}>
      <span className={`${prefixCls}-opt`}>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleOnPressEnter}
          disabled={disabled}
          placeholder={placeholder}
          style={inputStyle}
          className={contentClass}
          {...restInputProps}
        />
        <div className={`${prefixCls}-opt-arrow`}>
          <Button
            type="text"
            size="small"
            onClick={handleAdd}
            disabled={value >= max || disabled}
            icon={<UpFilled />}
          />
          <Button
            type="text"
            size="small"
            onClick={handleDecrease}
            disabled={value <= min || disabled}
            icon={<DownFilled />}
          />
        </div>
      </span>
    </BaseInput>
  );
};

export default InputNumber;
