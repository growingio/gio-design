import React from 'react';
import { SearchOutlined } from '@gio-design/icons';

import Input from '../input';

interface Props {
  placeholder?: string;
  value?: string;
  onSearch?: (value: string) => void;
}

const SearchBar = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { placeholder = '搜索', value, onSearch } = props;
  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'enter') {
      onSearch?.((e.target as HTMLInputElement)?.value);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch?.(e.target.value);
  };

  return (
    <Input
      style={{ width: '100%' }}
      placeholder={placeholder}
      forwardRef={ref}
      value={value}
      type="text"
      onKeyUp={onKeyUp}
      onChange={handleChange}
      suffix={<SearchOutlined className="icon-search" />}
    />
  );
});

export default SearchBar;
