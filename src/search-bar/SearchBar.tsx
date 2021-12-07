import { CloseCircleFilled, SearchOutlined } from '@gio-design/icons';
import { usePrefixCls } from '@gio-design/utils';
import classNames from 'classnames';
import React, { useCallback, useMemo, useState } from 'react';
import Input from '../input/Input';
import { SearchBarProps } from './interface';

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    onChange: onChangeFC,
    value: enterValue,
    disabled,
    placeholder,
    onSearch,
  } = props;

  const prefixCls = usePrefixCls('search', customizePrefixCls);
  const [value, setValue] = useState(enterValue);

  const [canClear, setClear] = useState(!!enterValue);

  const onClear = useCallback(() => {
    if (!disabled) {
      onSearch?.('');
      setClear(false);
      setValue('');
    }
  }, [onSearch, disabled]);

  const suffixCls = useMemo(
    () =>
      classNames(`${prefixCls}__suffix`, {
        [`${prefixCls}__suffix-clear`]: canClear,
        [`${prefixCls}__suffix-disabled`]: disabled,
      }),
    [prefixCls, canClear, disabled]
  );

  const suffix = useMemo(
    () =>
      canClear && !disabled ? (
        <CloseCircleFilled className={suffixCls} onClick={onClear} />
      ) : (
        <SearchOutlined className={suffixCls} />
      ),
    [suffixCls, canClear, onClear, disabled]
  );

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      onChangeFC?.(e);
      onSearch?.(inputValue);
      setValue(inputValue);
      setClear(!!inputValue);
    },
    [onChangeFC, onSearch]
  );

  return (
    <Input
      data-testid="search-bar"
      {...props}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      suffix={suffix}
      ref={ref}
    />
  );
});

export default SearchBar;
