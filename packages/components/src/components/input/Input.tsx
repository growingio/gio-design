import * as React from 'react';
import classNames from 'classnames';
import { InputProps, InputNumberProps, TextAreaProps } from './interfaces';

export const prefixCls = 'gio-input';

const InputFC: React.FC<InputProps> = ({
  type = 'text',
  value = '',
  onChange,
  onPressEnter,
  disabled = false,
  readOnly = false,
  placeholder = '',
  inputStyle,
  size = 'medium',
  suffix,
  wrapStyle,
  forwardRef,
  ...rest
}: InputProps) => {
  const wrapClass = classNames(prefixCls, {
    [`${prefixCls}-container`]: !!suffix,
  });

  const inputClass = classNames(
    `${prefixCls}-content`,
    {
      [`${prefixCls}-content-${size}`]: !!size,
    },
    {
      [`${prefixCls}-content-suffix`]: !!suffix,
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

  const [inputValue, setInputValue] = React.useState(value)

  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange && onChange(e);
  };

  React.useEffect(() => {
    setInputValue(value)
  }, [value]);

  return (
    <div className={wrapClass} style={wrapStyle}>
      <input
        className={inputClass}
        type={type}
        value={inputValue ?? ''}
        onChange={inputOnChange}
        onKeyDown={handleOnPressEnter}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={placeholder}
        style={inputStyle}
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
