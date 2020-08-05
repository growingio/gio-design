import * as React from 'react';
import BaseInput, { prefixCls } from './BaseInput';
import Button from '../button';
import { View, Unview } from '@gio-design/icons';
import { InputProps } from './types';

const Password: React.FC<InputProps> = ({
  value,
  onChange,
  onPressEnter,
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
  const [visible, setVisible] = React.useState(false);

  const contentClass = React.useMemo(() => `${prefixCls}-content${!!errorMsg ? '-error' : ''}`, [errorMsg]);

  const handleOnPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13 && onPressEnter) {
      onPressEnter(e);
    }
  };

  const toggleVisible = () => {
    if (visible) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };

  return (
    <BaseInput showOpt={showOpt} errorMsg={errorMsg} label={label} wrapStyle={wrapStyle}>
      <span className={`${prefixCls}-opt`}>
        <input
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          onKeyDown={handleOnPressEnter}
          disabled={disabled}
          maxLength={maxLength}
          placeholder={placeholder}
          style={inputStyle}
          className={contentClass}
          {...restInputProps}
        />
        <span className={`${prefixCls}-opt-view`}>
          <Button type='text' disabled={disabled} icon={visible ? <View /> : <Unview />} onClick={toggleVisible} />
        </span>
      </span>
    </BaseInput>
  );
};

export default Password;
