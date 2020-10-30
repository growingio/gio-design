import * as React from 'react';
import classNames from 'classnames';
import { prefixCls } from './Input';
import { TextAreaProps } from './interfaces';

const TextArea: React.FC<TextAreaProps> = ({
  disabled = false,
  resize = false,
  placeholder = '',
  style,
  wrapStyle,
  inputStyle,
  forwardRef,
  ...rest
}: TextAreaProps) => {
  const inputClass = classNames(`${prefixCls}-content`, `${prefixCls}-textarea`, {
    [`${prefixCls}-textarea-noresize`]: !resize,
  });

  const outerStyle = style !== undefined ? style : wrapStyle
  const innerStyle = style !== undefined ? {} : inputStyle
  if (wrapStyle !== undefined || inputStyle !== undefined) {
    console.warn(
      'The latest version of Input only accept "style" for inline-style setting, ' +
      'please fix your code because the deprecated parameter "wrapStyle" and "inputStyle" ' +
      'will be removed in the future version'
    )
  }

  return (
    <div className={prefixCls} style={outerStyle}>
      <textarea
        className={inputClass}
        disabled={disabled}
        placeholder={placeholder}
        style={innerStyle}
        ref={forwardRef}
        {...rest}
      />
    </div>
  );
};

export default TextArea;
