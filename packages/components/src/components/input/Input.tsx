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
  placeholder = '',
  inputStyle,
  size = 'medium',
  suffix,
  wrapStyle,
  ...rest
}) => {
  const { realTimeValue, handleOnChange } = useEnter(value, onChange);

  const wrapClass = classNames(prefixCls, {
    [`${prefixCls}-container`]: !!suffix,
  });

  const inputClass = classNames(
    `${prefixCls}-content`,
    {
      [`${prefixCls}-content-${size}`]: !!size,
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
        placeholder={placeholder}
        style={inputStyle}
        {...rest}
      />
      {renderSuffix()}
    </div>
  );
};

export default Input;
