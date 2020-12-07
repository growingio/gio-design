import React, { useEffect } from 'react';
import classNames from 'classnames';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import { TextAreaProps } from './interfaces';

const TextArea: React.FC<TextAreaProps> = ({
  value,
  disabled = false,
  resize = false,
  autosize = false,
  placeholder = '',
  onChange,
  maxLength,
  style,
  wrapStyle,
  inputStyle,
  forwardRef = React.createRef(),
  className,
  ...rest
}: TextAreaProps) => {
  const prefixCls = usePrefixCls('input');
  const hasMaxLength = maxLength !== undefined && maxLength > 0;
  const wrapClass = classNames(className, prefixCls, {
    [`${prefixCls}-showcount`]: hasMaxLength,
  });
  const inputClass = classNames(`${prefixCls}-content`, `${prefixCls}-textarea`, {
    [`${prefixCls}-textarea-noresize`]: !resize,
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (typeof onChange === 'function') {
      onChange(e);
    }
  };

  const extraProps = {} as any;

  let finalValue = value ?? '';

  if (hasMaxLength) {
    finalValue = `${finalValue}`.slice(0, maxLength);
    extraProps['data-count'] = `${finalValue.length} / ${maxLength}`;
  }

  useEffect(() => {
    if (autosize) {
      if (typeof forwardRef === 'object' && forwardRef !== null && forwardRef.current !== null) {
        const ele = forwardRef.current;
        ele.style.height = 'auto';
        ele.style.height = `${ele.offsetHeight - ele.clientHeight + ele.scrollHeight}px`;
      }
    }
  });

  const outerStyle = style !== undefined ? style : wrapStyle;
  const innerStyle = style !== undefined ? {} : inputStyle;
  if (wrapStyle !== undefined || inputStyle !== undefined) {
    console.warn(
      'The latest version of Input only accept "style" for inline-style setting, ' +
        'please fix your code because the deprecated parameter "wrapStyle" and "inputStyle" ' +
        'will be removed in the future version'
    );
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div className={wrapClass} style={outerStyle} {...extraProps}>
      <textarea
        value={finalValue}
        onChange={handleOnChange}
        className={inputClass}
        disabled={disabled}
        placeholder={placeholder}
        style={innerStyle}
        ref={forwardRef}
        maxLength={maxLength}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      />
    </div>
  );
};

export default TextArea;
