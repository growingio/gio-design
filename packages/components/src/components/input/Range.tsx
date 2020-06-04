import React, { useState } from 'react';
import Input, { InputProps } from './Input';
import classnames from 'classnames';

export interface Props extends InputProps {
  values: string[];
  minPlaceholder?: string;
  maxPlaceholder?: string;
  width?: number;
  label?: string;
  onChange?: (values: string[], value: string, type: 'min' | 'max') => void;
  onMinBlur?: (e: any) => void;
  onMaxBlur?: (e: any) => void;
}

const labelStyle = {
  width: 30,
  textAlign: 'center',
  cursor: 'default',
};

const noop = () => {};

const Range: React.FC<Props> = ({
  values = [],
  size = 'small',
  width,
  label = '-',
  minPlaceholder,
  maxPlaceholder,
  onChange = noop,
  disabled,
  className,
  onMinBlur,
  onMaxBlur,
}) => {
  const [min, max] = values;
  const [tempValues, setTempValues] = useState(values);
  const inputWidth = Math.max((width || 0) - labelStyle.width / 2, 50);

  const handleChange = (type: 'min' | 'max') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const [min, max] = tempValues;
    const value = e.target.value;
    let values;
    if (type === 'min') {
      values = [value, max];
      setTempValues(values);
      onChange(values, value, type);
    } else {
      values = [min, value];
      setTempValues(values);
      onChange(values, value, type);
    }
  };

  return (
    <Input.Group
      className={classnames('gio-input-range', { 'gio-input-disabled': disabled, [`${className}`]: className })}
    >
      <Input
        value={min}
        size={size}
        type='number'
        placeholder={minPlaceholder}
        className='gio-input-range-min'
        style={{ width: inputWidth }}
        onChange={handleChange('min')}
        disabled={disabled}
        onBlur={onMinBlur}
      />
      <Input size={size} style={labelStyle} placeholder={label} disabled={true} />
      <Input
        value={max}
        size={size}
        type='number'
        placeholder={maxPlaceholder}
        className='gio-input-range-max'
        style={{ width: inputWidth }}
        onChange={handleChange('max')}
        disabled={disabled}
        onBlur={onMaxBlur}
      />
      <div className='gio-input-range-wrapper' />
    </Input.Group>
  );
};

export default Range;
