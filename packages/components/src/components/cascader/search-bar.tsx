import { SearchOutlined, Close } from '@gio-design/icons';
import React, { useState } from 'react';

import { SizeType } from '../config-provider/SizeContext';
import { useDynamicData } from './helper';
import Input from '../input';

interface Props {
  placeholder?: string;
  value?: string;
  size?: SizeType;
  lazySearch?: boolean;
  onSearch?: (value: string) => void;
}

const SearchBar = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { placeholder = '搜索', value: originValue = '', onSearch, lazySearch, size } = props;
  const [value, setValue] = useDynamicData(originValue);
  const [inputState, setInputState] = useState('');
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (lazySearch && e.key === 'Enter') {
      onSearch?.((e.target as HTMLInputElement).value);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    if (inputState === 'init') {
      return;
    }
    if (!lazySearch) {
      onSearch?.(e.target.value);
    }
  };
  const handlerClick = () => {
    setValue('');
    onSearch?.('');
  };
  // 如果支持，优先使用 composition 事件
  const handleComposition = (e: React.CompositionEvent) => {
    if (e.type === 'compositionend') {
      setInputState('end');
      if (!lazySearch) {
        onSearch?.(value);
      }
    } else {
      setInputState('init');
    }
  };

  const suffix = value ? (
    <button type="button" onClick={handlerClick} className="clear-btn action-btn">
      <Close className="icon-clear suffix-icon" size="10" />
    </button>
  ) : (
    <button type="button" onClick={() => onSearch?.(value)} className="search-btn action-btn">
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
