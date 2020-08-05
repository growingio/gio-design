import * as React from 'react';
import BaseInput, { prefixCls } from './BaseInput';
import { TextAreaProps } from './types';

const TextArea: React.FC<TextAreaProps> = ({
  value,
  onChange,
  disabled = false,
  maxLength,
  placeholder = '',
  inputStyle,

  showOpt,
  errorMsg = '',
  label = '',
  wrapStyle,

  ...restInputProps
}) => {
  const contentClass = React.useMemo(() => `${prefixCls}-content${!!errorMsg ? '-error' : ''}`, [errorMsg]);

  return (
    <BaseInput showOpt={showOpt} errorMsg={errorMsg} label={label} wrapStyle={wrapStyle}>
      <textarea
        value={value}
        onChange={onChange}
        disabled={disabled}
        maxLength={maxLength}
        placeholder={placeholder}
        style={inputStyle}
        className={contentClass}
        {...restInputProps}
      />
    </BaseInput>
  );
};

export default TextArea;
