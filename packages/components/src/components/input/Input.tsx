import React, { useContext } from 'react';
import classNames from 'classnames';
import { InputProps, InputNumberProps, TextAreaProps } from './interfaces';
import { SizeContext } from '../config-provider/SizeContext';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';

const InputFC: React.FC<InputProps> = (props: InputProps) => {
  const prefixCls = usePrefixCls('input');
  const sizeContext = useContext(SizeContext);
  const {
    type = 'text',
    value,
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
    style,
    wrapStyle,
    inputStyle,
    forwardRef,
    className,
    ...rest
  } = props;
  const wrapClass = classNames(prefixCls, className, {
    [`${prefixCls}-container`]: !!suffix || !!prefix,
    [`${prefixCls}-container-${size}`]: !!size,
  });

  const inputClass = classNames(
    `${prefixCls}-content`,
    {
      [`${prefixCls}-content-suffix`]: !!suffix,
    },
    {
      [`${prefixCls}-content-prefix`]: !!prefix,
    }
  );

  const handleOnPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onPressEnter) {
      onPressEnter(e);
    }
  };

  const renderSuffix = () => {
    if (!suffix) {
      return null;
    }

    return <div className={`${prefixCls}-container-suffix`}>{suffix}</div>;
  };

  const renderPrefix = () => {
    if (!prefix) {
      return null;
    }
    return <div className={`${prefixCls}-container-prefix`}>{prefix}</div>;
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof onChange === 'function') {
      onChange(e);
    }
  };

  const outerStyle = style !== undefined ? style : wrapStyle || {};
  const innerStyle = style !== undefined ? {} : inputStyle || {};
  if (wrapStyle !== undefined || inputStyle !== undefined) {
    console.warn(
      'The latest version of Input only accept "style" for inline-style setting, ' +
        'please fix your code because the deprecated parameter "wrapStyle" and "inputStyle" ' +
        'will be removed in the future version'
    );
  }

  if (typeof prefixWidth === 'number') {
    innerStyle.paddingLeft = prefixWidth;
  }

  if (typeof suffixWidth === 'number') {
    innerStyle.paddingRight = suffixWidth;
  }

  return (
    <div className={wrapClass} style={outerStyle}>
      {renderPrefix()}
      <input
        className={inputClass}
        type={type}
        value={value ?? ''}
        onChange={handleOnChange}
        onKeyDown={handleOnPressEnter}
        style={innerStyle}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={placeholder}
        ref={forwardRef}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      />
      {renderSuffix()}
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
