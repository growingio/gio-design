import * as React from 'react';
import { UpFilled, DownFilled } from '@gio-design/icons';
import Input, { prefixCls } from './Input';
import { InputNumberProps } from './interfaces';

const InputNumber: React.FC<InputNumberProps> = ({
  value,
  onChange,
  max = Number.MAX_SAFE_INTEGER,
  min = -Number.MAX_SAFE_INTEGER,
  disabled = false,
  readOnly = false,
  ...rest
}: InputNumberProps) => {
  const addDisabled = React.useMemo(() => Number(value) >= max || disabled || readOnly, [
    value,
    max,
    disabled,
    readOnly,
  ]);

  const decreaseDisabled = React.useMemo(() => Number(value) <= min || disabled || readOnly, [
    value,
    min,
    disabled,
    readOnly,
  ]);

  const handleChange = (current: string) => {
    const v = Number(current);
    if (Number.isNaN(v) || v < min || v > max) {
      return;
    }
    onChange?.(current);
  };

  const handleAdd = () => {
    if (!addDisabled) {
      onChange?.(String(Number(value) + 1));
    }
  };

  const handleDecrease = () => {
    if (!decreaseDisabled) {
      onChange?.(String(Number(value) - 1));
    }
  };

  const renderSuffix = () => (
    <div className={`${prefixCls}-container-suffix-iconGroup`}>
      <UpFilled
        className={`${prefixCls}-container-suffix-iconGroup-top ${prefixCls}-container-suffix-icon${
          addDisabled ? '-disabled' : ''
        }`}
        onClick={handleAdd}
      />
      <DownFilled
        className={`${prefixCls}-container-suffix-iconGroup-bottom ${prefixCls}-container-suffix-icon${
          decreaseDisabled ? '-disabled' : ''
        }`}
        onClick={handleDecrease}
      />
    </div>
  );

  return (
    <Input
      {...rest}
      suffix={renderSuffix()}
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      disabled={disabled}
    />
  );
};

export default InputNumber;
