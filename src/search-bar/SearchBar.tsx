import { CloseCircleFilled, SearchOutlined } from '@gio-design/icons';
import { usePrefixCls } from '@gio-design/utils';
import classNames from 'classnames';
import React, { useCallback, useMemo, useState, useEffect, useRef } from 'react';
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
    className,
  } = props;

  const prefixCls = usePrefixCls('search', customizePrefixCls);
  const [value, setValue] = useState(enterValue);
  const inputRef = useRef<HTMLInputElement | null>();

  const [canClear, setClear] = useState(!!enterValue);

  const onClear = useCallback(() => {
    if (!disabled) {
      if (inputRef.current) {
        const inputObj = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value');
        inputObj.set.call(inputRef.current, '');
        const event = new Event('change', { bubbles: true });
        inputRef.current?.dispatchEvent(event);
      }
      onSearch?.('');
      setClear(false);
      setValue('');
    }
  }, [onSearch, disabled]);

  useEffect(() => {
    if (value !== enterValue) {
      setValue(enterValue);
    }
  }, [enterValue, value]);

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
      className={classNames(className, prefixCls)}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      suffix={suffix}
      ref={ref}
      inputRef={inputRef}
    />
  );
});

export default SearchBar;
