import { CloseCircleFilled, SearchOutlined } from '@gio-design/icons';
import { usePrefixCls } from '@gio-design/utils';
import classNames from 'classnames';
import React, { useCallback, useMemo, useState } from 'react';
import Input from '../input/Input';
import { SearchProps } from './interface';

import './style';

const Search = React.forwardRef<HTMLInputElement, SearchProps>((props, ref) => {
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
      onSearch && onSearch('');
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
      canClear ? (
        <CloseCircleFilled className={suffixCls} onClick={onClear} />
      ) : (
        <SearchOutlined className={suffixCls} />
      ),
    [suffixCls, canClear, onClear]
  );

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      onChangeFC && onChangeFC(e);
      onSearch && onSearch(inputValue);
      setValue(inputValue);
      setClear(!!inputValue);
    },
    [onChangeFC, onSearch]
  );

  const resetPlaceholder = useMemo(() => (placeholder || disabled ? '无法搜索' : '搜索'), [placeholder, disabled]);
  return (
    <Input {...props} placeholder={resetPlaceholder} value={value} onChange={onChange} suffix={suffix} ref={ref} />
  );
});

export default Search;
