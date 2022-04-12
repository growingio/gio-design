import React, { useState } from 'react';
import { Input, Select } from '../..';

// TODO: 自定义表单元素
type Currency = 'rmb' | 'dollar';

interface PriceValue {
  number?: number;
  currency?: Currency;
}

interface PriceInputProps {
  value?: PriceValue;
  onChange?: (value: PriceValue) => void;
}

const PriceInput: React.FC<PriceInputProps> = ({ value = {}, onChange }) => {
  const [number, setNumber] = useState(0);
  const [currency, setCurrency] = useState<Currency>('rmb');

  const triggerChange = (changedValue: { number?: number; currency?: Currency }) => {
    onChange?.({ number, currency, ...value, ...changedValue });
  };

  const onNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = parseInt(e.target.value || '0', 10);
    if (Number.isNaN(number)) {
      return;
    }
    if (!('number' in value)) {
      setNumber(newNumber);
    }
    triggerChange({ number: newNumber });
  };

  const onCurrencyChange = (newCurrency: Currency) => {
    if (!('currency' in value)) {
      setCurrency(newCurrency);
    }
    triggerChange({ currency: newCurrency });
  };

  return (
    <span>
      <Input type="text" value={value.number ?? number} onChange={onNumberChange} style={{ width: 100 }} />
      <Select value={value.currency || currency} style={{ width: 80, margin: '0 8px' }} onChange={onCurrencyChange}>
        <Select.Option value="rmb">RMB</Select.Option>
        <Select.Option value="dollar">Dollar</Select.Option>
      </Select>
    </span>
  );
};

export default PriceInput;
