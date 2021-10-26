/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo, useCallback, useContext, useState } from 'react';
import classNames from 'classnames';
import { InputProps, InputNumberProps, TextAreaProps } from './interfaces';
import { SizeContext } from '../../components/config-provider/SizeContext';
import useMergeRef from '../../utils/hooks/useMergeRef';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';

const InputFC: React.FC<InputProps> = (props: InputProps) => {
  const prefixCls = usePrefixCls('legacy-input');
  const sizeContext = useContext(SizeContext);
  const {
    type = 'text',
    value,
    onFocus,
    onBlur,
    onChange,
    onPressEnter,
    disabled = false,
    readOnly = false,
    placeholder = '',
    size = sizeContext || 'middle',
    prefix,
    prefixWidth,
    suffix,
    suffixWidth,
    style = {},
    forwardRef = null,
    className,
    ...rest
  } = props;
  const [inputFocus, setFocus] = useState(false);
  const inputRef = useMergeRef(forwardRef);

  const wrapClass = classNames(prefixCls, className, {
    [`${prefixCls}--${size}`]: !!size,
    [`${prefixCls}--disabled`]: disabled,
    [`${prefixCls}--focus`]: inputFocus,
    [`${prefixCls}__container`]: !!suffix || !!prefix,
  });
  const inputClass = classNames(
    `${prefixCls}__content`,
    {
      [`${prefixCls}__content-suffix`]: !!suffix,
    },
    {
      [`${prefixCls}__content-prefix`]: !!prefix,
    }
  );

  const inputPrefix = useMemo(
    () =>
      prefix ? (
        <div style={{ width: prefixWidth }} className={`${prefixCls}__prefix`}>
          {prefix}
        </div>
      ) : null,
    [prefix, prefixWidth, prefixCls]
  );

  const inputSuffix = useMemo(
    () =>
      suffix ? (
        <div style={{ width: suffixWidth }} className={`${prefixCls}__suffix`}>
          {suffix}
        </div>
      ) : null,
    [suffix, suffixWidth, prefixCls]
  );

  const handlePressEnter = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && onPressEnter) {
        onPressEnter(e);
      }
    },
    [onPressEnter]
  );

  const handleFocus = useCallback(
    (e) => {
      setFocus(true);
      if (typeof onFocus === 'function') {
        onFocus(e);
      }
    },
    [onFocus]
  );

  const handleBlur = useCallback(
    (e) => {
      setFocus(false);
      if (typeof onBlur === 'function') {
        onBlur(e);
      }
    },
    [onBlur]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (typeof onChange === 'function') {
        onChange(e);
      }
    },
    [onChange]
  );

  return (
    <div className={wrapClass} style={style}>
      {inputPrefix}
      <input
        className={inputClass}
        type={type}
        value={value ?? ''}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={handlePressEnter}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={placeholder}
        ref={inputRef}
        {...rest}
      />
      {inputSuffix}
    </div>
  );
};

class Input extends React.Component<InputProps> {
  public static InputNumber: React.FC<InputNumberProps>;

  public static Password: React.FC<InputProps>;

  public static TextArea: React.FC<TextAreaProps>;

  public render(): React.ReactNode {
    return <InputFC {...this.props} />;
  }
}

export default Input;
