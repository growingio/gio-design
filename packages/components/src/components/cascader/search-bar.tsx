import { SearchOutlined } from '@gio-design/icons';
import React from 'react';

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
  const { placeholder = '搜索', value: originValue = '', onSearch, lazySearch } = props;
  const [value, setValue] = useDynamicData(originValue);
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (lazySearch && e.key === 'Enter') {
      onSearch?.((e.target as HTMLInputElement).value);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (!lazySearch) {
      onSearch?.(e.target.value);
    }
  };

  return (
    <Input
      style={{ width: '100%' }}
      placeholder={placeholder}
      forwardRef={ref}
      value={value}
      // size={size}
      type="text"
      onKeyUp={handleKeyUp}
      onChange={handleChange}
      suffix={<SearchOutlined className="icon-search" />}
    />
  );
});

export default SearchBar;
