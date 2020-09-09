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
  placeholder = '',
  inputStyle,
  wrapStyle,
  ...rest
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
        placeholder={placeholder}
        style={inputStyle}
        {...rest}
      />
    </div>
  );
};

export default TextArea;
