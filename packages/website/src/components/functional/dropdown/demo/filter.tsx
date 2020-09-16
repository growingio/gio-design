/* eslint-disable react/jsx-wrap-multilines */
import React, { useState } from 'react';
import { Button, Dropdown, List, SearchBar } from '@gio-design/components';
import { FilterOutlined } from '@gio-design/icons';
import { difference, union } from 'lodash';

const options = [
  { value: 'a', label: '功能名称' },
  { value: 'b', label: '功能名称' },
  { value: 'c', label: '功能名称' },
  { value: 'd', label: '功能名称' },
  { value: 'e', label: '功能名称' },
  { value: 'f', label: '功能名称' },
  { value: 'g', label: '功能名称' },
  { value: 'h', label: '功能名称' },
];

export default () => {
  const [searchvalue, setSearchValue] = useState<string>('');
  const [value, setValue] = useState<string[]>(['a', 'b']);
  return (
    <Dropdown
      overlay={
        <>
          <SearchBar
            id="demo"
            value={searchvalue}
            onChange={(va) => {
              setSearchValue(va);
            }}
            inputWrapStyle={{ width: 208, margin: '16px 16px 8px' }}
          />
          <List
            dataSource={options}
            width={240}
            height={358}
            value={value}
            isMultiple
            onChange={(o) => {
              if (value.includes(o.value)) {
                setValue(difference(value, o.value));
              } else {
                setValue(union(value, o.value));
              }
            }}
          />
          <div style={{ borderTop: '1px solid #DCDFED' }}>
            <Button
              type="text"
              size="small"
              style={{ margin: '12px 16px' }}
              onClick={() => {
                setValue([]);
              }}
            >
              清除
            </Button>
            <Button size="small" style={{ float: 'right', margin: '12px 16px' }}>
              确定
            </Button>
          </div>
        </>
      }
    >
      <Button type="assist" icon={<FilterOutlined />} />
    </Dropdown>
  );
};
