import React, { useState } from 'react';
import classnames from 'classnames';
import { CloseCircleFilled, SearchOutlined } from '@gio-design/icons';
import { usePrefixCls, useLocale } from '@gio-design/utils';
import { Button } from '../../index';
import Input from '../input';
import { SearchBarProps } from './interfaces';
import defaultLocale from './locales/zh-CN';

export { SearchBarProps } from './interfaces';

const getStorage = (key: string): string[] => {
  const empty: string[] = [];
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : empty;
  } catch (error) {
    return empty;
  }
};

const setStorage = (key: string, value: string) => {
  try {
    const oldValue = getStorage(key);
    if (!value || oldValue.some((item) => item === value)) {
      return oldValue;
    }
    const newValue = oldValue.concat(value);
    localStorage.setItem(key, JSON.stringify(newValue));
    return newValue;
  } catch (error) {
    return [];
  }
};
const findStorage = (key: string, value: string): string[] => {
  const storages = getStorage(key);
  return storages.filter((item) => item.startsWith(value));
};

const clearStorage = (key: string): string[] => {
  localStorage.removeItem(key);
  return [];
};

const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {
  const prefixCls = usePrefixCls('searchbar-legacy');
  const [searchValue, setSearchValue] = useState('');
  const {
    showStorage = false,
    storageNum = 5,
    allowClearStorage = false,
    showClear = false,
    disabled = false,
    size = 'middle',
    inputStyle,
    style,
    placeholder,
    value,
    onChange = setSearchValue,
    id,
    className,
  } = props;
  const storageKey = React.useMemo(() => `${prefixCls}-storage-${id}`, [id, prefixCls]);

  const [searchStorage, setSearchStorage] = React.useState(getStorage(storageKey));
  const [showDropdown, setShowDropdown] = React.useState(false);

  const locale = useLocale('SearchBar');
  const { show, record, clearText }: { show: string; record: string; clearText: string } = {
    ...defaultLocale,
    ...locale,
  };

  const handleClearStorage = () => {
    const emptyValue = clearStorage(storageKey);
    setSearchStorage(emptyValue);
  };

  const handleClearValue = () => {
    onChange('');
    const newValue = findStorage(storageKey, '');
    setSearchStorage(newValue);
  };

  const handleFocus = () => {
    searchStorage.length && setShowDropdown(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setShowDropdown(false);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { value } = e.target;
    setTimeout(() => {
      id && setStorage(storageKey, value);
      setShowDropdown(false);
    }, 200);
  };

  const renderSuffix = () => {
    if (value || searchValue) {
      return showClear ? (
        <CloseCircleFilled className={`${prefixCls}-suffix-close`} onClick={handleClearValue} />
      ) : null;
    }
    return <SearchOutlined className={`${prefixCls}-suffix-search`} />;
  };

  // 按esc建关闭下拉框
  const handleKeyUp = (e: any) => {
    e.keyCode === 27 && handleBlur(e);
  };

  const renderStorage = () => {
    if (!showStorage || !showDropdown) {
      return null;
    }

    return (
      <div className={`${prefixCls}-dropdown`}>
        {allowClearStorage && (
          <div className={`${prefixCls}-dropdown-clear`}>
            <span className={`${prefixCls}-dropdown-clear-text`}>
              {show}
              {storageNum}
              {record}
            </span>
            <Button type="text" onClick={handleClearStorage}>
              {clearText}
            </Button>
          </div>
        )}
        {searchStorage
          .slice(searchStorage.length - storageNum >= 0 ? searchStorage.length - storageNum : 0, searchStorage.length)
          .reverse()
          .map((item) => (
            <div
              onClick={() => {
                onChange(item);
              }}
              className={`${prefixCls}-dropdown-item`}
              key={item}
              aria-hidden="true"
            >
              {item}
            </div>
          ))}
      </div>
    );
  };

  const wrapperCls = classnames(prefixCls, className);
  return (
    <div className={wrapperCls} style={style}>
      <Input
        disabled={disabled}
        size={size}
        style={inputStyle}
        suffix={renderSuffix()}
        value={value || searchValue}
        placeholder={placeholder}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyUp={handleKeyUp}
      />
      {renderStorage()}
    </div>
  );
};

export default SearchBar;
