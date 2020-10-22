import * as React from 'react';
import { SearchBar } from '@gio-design/components';
import '@gio-design/components/es/components/search-bar/style/index.less';

export default () => {
  const [value, setValue] = React.useState('');

  return (
    <SearchBar
      showStorage
      showClear
      allowClearStorage
      value={value}
      onChange={setValue}
      id="demo1"
      size="medium"
    />
  );
};
