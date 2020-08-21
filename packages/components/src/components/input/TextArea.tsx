import * as React from 'react';
import classNames from 'classnames';
import useEnter from './hooks/useEnter';
import { prefixCls } from './Input';
import { TextAreaProps } from './interfaces';

const TextArea: React.FC<TextAreaProps> = ({
  value,
  onChange,
  disabled = false,
  resize = false,
  maxLength,
  placeholder = '',
  inputStyle,
  wrapStyle,
  ...restInputProps
}) => {
  const { realTimeValue, handleOnChange } = useEnter(value, onChange);

  const inputClass = classNames(`${prefixCls}-content`, `${prefixCls}-textarea`, {
    [`${prefixCls}-textarea-noresize`]: !resize,
  });

  return (
    <div className={prefixCls} style={wrapStyle}>
      <textarea
        className={inputClass}
        value={realTimeValue}
        onChange={handleOnChange}
        disabled={disabled}
        maxLength={maxLength}
        placeholder={placeholder}
        style={inputStyle}
        {...restInputProps}
      />
    </div>
  );
};

export default TextArea;
