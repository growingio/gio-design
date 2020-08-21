import * as React from 'react';
import classNames from 'classnames';
import useEnter from './hooks/useEnter';
import { InputProps } from './interfaces';

export const prefixCls = 'gio-input';

const Input: React.FC<InputProps> = ({
  value,
  type = 'text',
  onChange,
  onPressEnter,
  disabled = false,
  readOnly = false,
  maxLength,
  placeholder = '',
  inputStyle,
  size = 'medium',
  suffix,
  wrapStyle,
  ...restInputProps
}) => {
  const { realTimeValue, handleOnChange } = useEnter(value, onChange);

  const wrapClass = classNames(prefixCls, {
    [`${prefixCls}-container`]: !!suffix,
  });

  const inputClass = classNames(
    `${prefixCls}-content`,
    {
      [`${prefixCls}-content-medium`]: size === 'medium',
      [`${prefixCls}-content-larget`]: size === 'large',
      [`${prefixCls}-content-small`]: size === 'small',
    },
    {
      [`${prefixCls}-content-suffix`]: !!suffix,
    }
  );

  const handleOnPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13 && onPressEnter) {
      onPressEnter(e);
    }
  };

  const renderSuffix = () => {
    if (!suffix) {
      return null;
    }

    return <div className={`${prefixCls}-container-suffix`}>{suffix}</div>;
  };

  return (
    <div className={wrapClass} style={wrapStyle}>
      <input
        className={inputClass}
        type={type}
        value={realTimeValue}
        onChange={handleOnChange}
        onKeyDown={handleOnPressEnter}
        disabled={disabled}
        readOnly={readOnly}
        maxLength={maxLength}
        placeholder={placeholder}
        style={inputStyle}
        {...restInputProps}
      />
      {renderSuffix()}
    </div>
  );
};

export default Input;
