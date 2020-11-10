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
  const { placeholder = '搜索', value = '', onSearch, lazySearch } = props;
  const [innerValue, setValue] = useDynamicData(value);
  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (lazySearch && e.key === 'Enter') {
      onSearch?.((e.target as HTMLInputElement)?.value);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (lazySearch) {
      setValue(e.target.value);
      return;
    }
    onSearch?.(e.target.value);
  };

  return (
    <Input
      style={{ width: '100%' }}
      placeholder={placeholder}
      forwardRef={ref}
      value={innerValue}
      // size={size}
      type="text"
      onKeyUp={onKeyUp}
      onChange={handleChange}
      suffix={<SearchOutlined className="icon-search" />}
    />
  );
});

export default SearchBar;
