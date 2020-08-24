import * as React from 'react';
import Input, { prefixCls } from './Input';
import Button from '../button';
import { UpFilled, DownFilled } from '@gio-design/icons';
import { InputNumberProps } from './interfaces';

const InputNumber: React.FC<InputNumberProps> = ({
  value,
  onChange,
  max = Number.MAX_SAFE_INTEGER,
  min = -Number.MAX_SAFE_INTEGER,
  disabled = false,
  ...rest
}) => {
  const handleChange = (value: string) => {
    const v = Number(value);
    if (isNaN(v) || v < min || v > max) {
      return;
    }
    onChange(value);
  };

  const handleAdd = () => {
    onChange(String(Number(value) + 1));
  };

  const handleDecrease = () => {
    onChange(String(Number(value) - 1));
  };

  const renderSuffix = () => (
    <div className={`${prefixCls}-opt-arrow`}>
      <Button
        type="text"
        size="small"
        onClick={handleAdd}
        disabled={Number(value) >= max || disabled}
        icon={<UpFilled />}
      />
      <Button
        type="text"
        size="small"
        onClick={handleDecrease}
        disabled={Number(value) <= min || disabled}
        icon={<DownFilled />}
      />
    </div>
  );

  return <Input {...rest} suffix={renderSuffix()} value={value} onChange={handleChange} disabled={disabled} />;
};

export default InputNumber;
