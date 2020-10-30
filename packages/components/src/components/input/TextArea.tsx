import * as React from 'react';
import classNames from 'classnames';
import { prefixCls } from './Input';
import { TextAreaProps } from './interfaces';

const TextArea: React.FC<TextAreaProps> = ({
  disabled = false,
  resize = false,
  placeholder = '',
  style,
  forwardRef,
  ...rest
}: TextAreaProps) => {
  const inputClass = classNames(`${prefixCls}-content`, `${prefixCls}-textarea`, {
    [`${prefixCls}-textarea-noresize`]: !resize,
  });

  return (
    <div className={prefixCls} style={style}>
      <textarea
        className={inputClass}
        disabled={disabled}
        placeholder={placeholder}
        ref={forwardRef}
        {...rest}
      />
    </div>
  );
};

export default TextArea;
