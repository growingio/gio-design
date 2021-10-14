import { SearchOutlined, CloseOutlined } from '@gio-design/icons';
import React, { useState } from 'react';
import { useLocale } from '@gio-design/utils';
import { SizeType } from './interface';
import { useDynamicData } from './helper';
import Input from '../components/input';
import defaultLocale from './locales/zh-CN';

interface Props {
  placeholder?: string;
  value?: string;
  size?: SizeType;
  lazySearch?: boolean;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  onCompositionStart?: (e: React.CompositionEvent) => void;
  onCompositionEnd?: (e: React.CompositionEvent) => void;
}

const SearchBar = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  const locale = useLocale('Cascader');
  const { searchPlaceholder }: { searchPlaceholder: string } = {
    ...defaultLocale,
    ...locale,
  };

  const {
    placeholder = searchPlaceholder,
    value: originValue = '',
    onSearch,
    onChange,
    lazySearch,
    size,
    onCompositionStart,
    onCompositionEnd,
  } = props;
  const [value, setValue] = useDynamicData(originValue);
  const [inputState, setInputState] = useState('');
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const nextValue = (e.target as HTMLInputElement).value;
    if (lazySearch && e.key === 'Enter') {
      onSearch?.(nextValue);
    }
    onChange?.(nextValue);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.value;
    setValue(nextValue);

    if (inputState === 'init') {
      return;
    }
    if (!lazySearch) {
      onSearch?.(nextValue);
    }
    onChange?.(nextValue);
  };
  const handlerClick = () => {
    setValue('');
    onChange?.('');
    onSearch?.('');
  };
  // 如果支持，优先使用 composition 事件
  const handleComposition = (e: React.CompositionEvent) => {
    if (e.type === 'compositionend') {
      setInputState('end');
      if (!lazySearch) {
        onSearch?.(value);
      }
      onCompositionStart?.(e);
    } else {
      setInputState('init');
      onCompositionEnd?.(e);
    }
  };

  const suffix = value ? (
    <button type="button" onClick={handlerClick} className="clear-btn action-btn">
      <CloseOutlined className="icon-clear suffix-icon" size="10" />
    </button>
  ) : (
    <button type="button" className="search-btn action-btn">
      <SearchOutlined className="icon-search suffix-icon" />
    </button>
  );

  return (
    <Input
      style={{ width: '100%' }}
      placeholder={placeholder}
      forwardRef={ref}
      value={value}
      size={size}
      type="text"
      onKeyUp={handleKeyUp}
      onChange={handleChange}
      onCompositionStart={handleComposition}
      onCompositionEnd={handleComposition}
      suffix={suffix}
    />
  );
});

export default SearchBar;
