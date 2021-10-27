import { CloseCircleFilled, DownFilled, EventsPresetOutlined } from '@gio-design/icons';
import { usePrefixCls } from '@gio-design/utils';
import classNames from 'classnames';
import React, { useCallback, useMemo, useState } from 'react';
import Input from './Input';
import { InputButtonProps } from './interface';

import './style';

const InputButton = React.forwardRef<HTMLInputElement, InputButtonProps>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    prefix: customizePrefix,
    suffix: customizeSuffix,
    onInputChange,
    value: enterValue,
    disabled,
    hidePrefix = false,
    allowClear,
    className,
    style = {},
    wrapStyle = {},
    inputStyle = {},
  } = props;

  const prefixCls = usePrefixCls('input-btn-new', customizePrefixCls);

  const [value, setValue] = useState(enterValue);

  const onClear = useCallback(() => {
    if (disabled) {
      return;
    }
    onInputChange?.('');
    setValue('');
  }, [onInputChange, disabled]);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      onInputChange?.(inputValue);
      setValue(inputValue);
    },
    [onInputChange]
  );

  const wrapperCls = useMemo(
    () => classNames(className, prefixCls, { [`${prefixCls}__disabled`]: disabled }),
    [className, prefixCls, disabled]
  );

  const prefix = useMemo(
    () => (hidePrefix ? null : customizePrefix || <EventsPresetOutlined />),
    [customizePrefix, hidePrefix]
  );

  const suffix = useMemo(() => {
    const hideClear = allowClear === false;
    const defaultSuffix = value && !hideClear ? <CloseCircleFilled onClick={onClear} /> : <DownFilled />;
    return customizeSuffix || defaultSuffix;
  }, [customizeSuffix, value, onClear, allowClear]);

  return (
    <span className={wrapperCls} style={{ ...style, ...wrapStyle }}>
      <Input
        style={inputStyle}
        placeholder="请选择事件"
        readOnly
        value={value}
        onChange={onChange}
        prefix={prefix}
        suffix={suffix}
        ref={ref}
      />
    </span>
  );
});

export default InputButton;
