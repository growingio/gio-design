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
    onChange: onChangeFC,
    onInputChange,
    value: enterValue,
    disabled,
    hidePrefix = false,
    allowClear,
  } = props;

  const prefixCls = usePrefixCls('input-btn', customizePrefixCls);

  const [value, setValue] = useState(enterValue);
  const [canClear, setClear] = useState(!!enterValue);

  const onClear = useCallback(() => {
    if (disabled) {
      return;
    }
    onInputChange && onInputChange('');
    setValue('');
    setClear(false);
  }, [onInputChange, disabled]);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      onChangeFC && onChangeFC(e);
      onInputChange && onInputChange(inputValue);
      setValue(inputValue);
      setClear(!!inputValue);
    },
    [onInputChange, onChangeFC]
  );

  const wrapperCls = useMemo(
    () => classNames(prefixCls, { [`${prefixCls}__disabled`]: disabled }),
    [prefixCls, disabled]
  );

  const prefix = useMemo(
    () => (hidePrefix ? null : customizePrefix || <EventsPresetOutlined />),
    [customizePrefix, hidePrefix]
  );

  const suffix = useMemo(() => {
    const hideClear = allowClear === false;
    const defaultSuffix = canClear && !hideClear ? <CloseCircleFilled onClick={onClear} /> : <DownFilled />;
    return customizeSuffix || defaultSuffix;
  }, [customizeSuffix, canClear, onClear, allowClear]);

  return (
    <span className={wrapperCls}>
      <Input
        {...props}
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
