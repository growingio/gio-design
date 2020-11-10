import React, { useEffect } from 'react';
import classNames from 'classnames';
import { prefixCls } from './Input';
import { TextAreaProps } from './interfaces';

const TextArea: React.FC<TextAreaProps> = ({
  value,
  disabled = false,
  resize = false,
  autosize = false,
  placeholder = '',
  style,
  wrapStyle,
  inputStyle,
  forwardRef = React.createRef(),
  ...rest
}: TextAreaProps) => {
  const inputClass = classNames(`${prefixCls}-content`, `${prefixCls}-textarea`, {
    [`${prefixCls}-textarea-noresize`]: !resize,
  });

  useEffect(() => {
    if (autosize && typeof forwardRef === 'object') {
      const ele = forwardRef.current;
      ele.style.height = 'auto';
      ele.style.height = (ele.offsetHeight - ele.clientHeight + ele.scrollHeight) + 'px';
    }
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
        value={value ?? ''}
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
