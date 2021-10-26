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
  showCount = false,
  style,
  forwardRef = React.createRef(),
  className,
  ...rest
}: TextAreaProps) => {
  const prefixCls = usePrefixCls('legacy-input');
  const hasMaxLength = maxLength !== undefined && maxLength > 0;
  const wrapClass = classNames(className, prefixCls, `${prefixCls}__textarea-wrapper`, {
    [`${prefixCls}--show-count`]: hasMaxLength && showCount,
    [`${prefixCls}--disabled`]: disabled,
  });
  const inputClass = classNames(`${prefixCls}__content`, `${prefixCls}__textarea`, {
    [`${prefixCls}__textarea--no-resize`]: !resize,
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

  return (
    <div className={wrapClass} style={style} {...extraProps}>
      <textarea
        value={finalValue}
        onChange={handleOnChange}
        className={inputClass}
        disabled={disabled}
        placeholder={placeholder}
        ref={forwardRef}
        maxLength={maxLength}
        {...rest}
      />
    </div>
  );
};

export default TextArea;
