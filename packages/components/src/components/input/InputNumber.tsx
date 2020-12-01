import * as React from 'react';
import { UpFilled, DownFilled } from '@gio-design/icons';
import Input from './Input';
import usePrefix from '../../utils/hooks/use-prefix-cls';
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
  const prefixCls = usePrefix('input');
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

  const handleFinalChange = (current: string) => {
    const minValue = min <= max ? min : max;
    const maxValue = max > min ? max : min;
    const v = Number(value);
    if (Number.isNaN(v) || v < minValue) {
      onChange?.(`${minValue}`);
    } else if (v > maxValue) {
      onChange?.(`${maxValue}`);
    }
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
      onBlur={(e) => handleFinalChange(e.target.value)}
      onChange={(e) => onChange?.(e.target.value)}
      disabled={disabled}
    />
  );
};

export default InputNumber;
