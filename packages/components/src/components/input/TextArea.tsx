import * as React from 'react';
import classNames from 'classnames';
import { prefixCls } from './Input';
import { TextAreaProps } from './interfaces';

const TextArea: React.FC<TextAreaProps> = ({
  disabled = false,
  resize = false,
  placeholder = '',
  inputStyle,
  wrapStyle,
  forwardRef,
  ...rest
}: TextAreaProps) => {
  const inputClass = classNames(`${prefixCls}-content`, `${prefixCls}-textarea`, {
    [`${prefixCls}-textarea-noresize`]: !resize,
  });

  return (
    <div className={prefixCls} style={wrapStyle}>
      <textarea
        className={inputClass}
        disabled={disabled}
        placeholder={placeholder}
        style={inputStyle}
        ref={forwardRef}
        {...rest}
      />
    </div>
  );
};

export default TextArea;
