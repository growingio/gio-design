import React from 'react';
import { SearchOutlined } from '@gio-design/icons';

import Input from '../input';

interface Props {
  value?: string;
  onSearch?: (value: string) => void;
}

const SearchBar = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { value, onSearch } = props;
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
      forwardRef={ref}
      value={value}
      type="text"
      onKeyUp={onKeyUp}
      onChange={handleChange}
      suffix={<SearchOutlined />}
    />
  );
});

export default SearchBar;
