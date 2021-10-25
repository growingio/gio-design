import { CloseCircleFilled, EventsPresetOutlined, SearchOutlined } from '@gio-design/icons';
import { usePrefixCls } from '@gio-design/utils';
import classNames from 'classnames';
import React, { useCallback, useMemo, useState } from 'react';
import Input from '../input/Input';
import { InputButtonProps } from './interface';

import './style';

const InputButton = React.forwardRef<HTMLInputElement, InputButtonProps>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    prefix,
    onChange: onChangeFC,
    value: enterValue,
    disabled,
    placeholder,
  } = props;

  const prefixCls = usePrefixCls('search', customizePrefixCls);
  const [value, setValue] = useState(enterValue);

  const [canClear, setClear] = useState(!!enterValue);

  const prefixIcon = <EventsPresetOutlined />;

  const suffixCls = useMemo(
    () =>
      classNames(`${prefixCls}__suffix`, {
        [`${prefixCls}__suffix-clear`]: canClear,
        [`${prefixCls}__suffix-disabled`]: disabled,
      }),
    [prefixCls, canClear, disabled]
  );

  const suffix = useMemo(
    () => (canClear ? <CloseCircleFilled className={suffixCls} /> : <SearchOutlined className={suffixCls} />),
    [suffixCls, canClear]
  );

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChangeFC && onChangeFC(e);
    // onSearch && onSearch(inputValue);
    setValue(inputValue);
    setClear(!!inputValue);
  }, []);

  const resetPlaceholder = useMemo(() => (placeholder || disabled ? '无法搜索' : '搜索'), [placeholder, disabled]);
  return (
    <Input
      {...props}
      placeholder={resetPlaceholder}
      value={value}
      onChange={onChange}
      prefix={prefixIcon}
      suffix={suffix}
      ref={ref}
    />
  );
});

export default InputButton;
