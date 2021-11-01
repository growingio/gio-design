import React, { useCallback, useMemo } from 'react';
import { UpFilled, DownFilled } from '@gio-design/icons';
import Input from './Input';
import usePrefix from '../../utils/hooks/use-prefix-cls';
import { InputNumberProps, PossibleValueType } from './interfaces';

const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 2 ** 53 - 1;

const MAX_SAFE_NEGATIVE_INTEGER = -MAX_SAFE_INTEGER;

const isValidProps = (value: any) => value !== undefined && value !== null;

/**
 * @description '1.' '1x' 'xx' '' 为 inCompleteNumber
 */
const isInCompleteNumber = (num: PossibleValueType) =>
  Number.isNaN(num) || num === '' || num === null || (num && num.toString().indexOf('.') === num.toString().length - 1);

/**
 * 转为可能的数字值,如果是未完成的或者无法转为数字的值则原样返回
 * @param num
 */
const parseToNumber = (num: number | string): PossibleValueType => {
  if (isInCompleteNumber(num)) {
    return num;
  }
  const parsedNumber = Number(num);
  return Number.isNaN(parsedNumber) ? '' : parsedNumber;
};

const getValidValue = (value: string, min = MAX_SAFE_NEGATIVE_INTEGER, max = MAX_SAFE_INTEGER) => {
  let val = parseFloat(value);

  if (val < min) {
    val = min;
  }
  if (val > max) {
    val = max;
  }
  return val;
};

const InputNumber: React.FC<InputNumberProps> = ({
  value,
  onChange,
  max = MAX_SAFE_INTEGER,
  min = MAX_SAFE_NEGATIVE_INTEGER,
  disabled = false,
  readOnly = false,
  customDisplay,
  decimalSeparator = '.',
  onBlur,
  ...rest
}: InputNumberProps) => {
  const prefixCls = usePrefix('input');
  const increaseDisabled = useMemo(() => Number(value) >= max || disabled || readOnly, [
    value,
    max,
    disabled,
    readOnly,
  ]);

  const decreaseDisabled = useMemo(() => Number(value) <= min || disabled || readOnly, [
    value,
    min,
    disabled,
    readOnly,
  ]);

  const parser = useCallback(
    (inputValue: string) => {
      if (customDisplay?.parser) {
        return customDisplay.parser(inputValue);
      }
      return inputValue.replace(/[^\w.-]+/g, '');
    },
    [customDisplay]
  );

  const getCurrentValidValue = useCallback(
    (v) => {
      let val = v;
      if (val === '') {
        val = '';
      } else if (!isInCompleteNumber(parseFloat(val))) {
        val = getValidValue(val, min, max);
      } else {
        val = value;
      }
      const num = Number(parseToNumber(val));
      return Number.isNaN(num) ? '' : num;
    },
    [value, max, min]
  );

  const getValueFromEventValue = useCallback(
    (eventValue: string) => {
      // 简单兼容一下中文句号
      let v = eventValue.trim().replace(/。/g, '.');
      if (isValidProps(decimalSeparator)) {
        v = v.replace(decimalSeparator, '.');
      }
      return v;
    },
    [decimalSeparator]
  );

  const handleInputChange = useCallback(
    (inputValue: string) => {
      const parsedValue = parser(getValueFromEventValue(inputValue));
      onChange?.(parseToNumber(parsedValue));
    },
    [onChange, parser, getValueFromEventValue]
  );

  const displayValue = useMemo(() => {
    let v: PossibleValueType = value;
    if (value === undefined || value === null) {
      v = '';
    }
    if (customDisplay?.formatter) {
      v = customDisplay.formatter(v);
    }

    if (isValidProps(decimalSeparator)) {
      v = v.toString().replace('.', decimalSeparator);
    }
    return v;
  }, [value, customDisplay, decimalSeparator]);

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const validValue = getCurrentValidValue(value);
      onChange?.(validValue);
      if (onBlur) {
        const newEvent: React.FocusEvent<HTMLInputElement> = {
          ...e,
          target: { ...e.target, value: validValue as any },
        };
        onBlur(newEvent);
      }
    },
    [onChange, onBlur, getCurrentValidValue, value]
  );

  const handleIncrease = useCallback(() => {
    if (!increaseDisabled) {
      onChange?.(Number(value) + 1);
    }
  }, [increaseDisabled, onChange, value]);

  const handleDecrease = useCallback(() => {
    if (!decreaseDisabled) {
      onChange?.(Number(value) - 1);
    }
  }, [decreaseDisabled, onChange, value]);

  const inputNumberSuffix = useMemo(
    () => (
      <div className={`${prefixCls}__suffix-iconGroup`}>
        <DownFilled
          className={`${prefixCls}__suffix-iconGroup-bottom ${prefixCls}__suffix-icon${
            decreaseDisabled ? '-disabled' : ''
          }`}
          onClick={handleDecrease}
        />
        <UpFilled
          className={`${prefixCls}__suffix-iconGroup-top ${prefixCls}__suffix-icon${
            increaseDisabled ? '-disabled' : ''
          }`}
          onClick={handleIncrease}
        />
      </div>
    ),
    [increaseDisabled, decreaseDisabled, handleIncrease, handleDecrease, prefixCls]
  );

  return (
    <Input
      {...rest}
      suffix={inputNumberSuffix}
      value={displayValue}
      onBlur={handleBlur}
      onChange={(e) => handleInputChange(e.target.value)}
      disabled={disabled}
    />
  );
};

export default InputNumber;
