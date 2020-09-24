/* eslint-disable react/jsx-wrap-multilines */
import React, { useState } from 'react';
import { Button, Dropdown, List, SearchBar } from '@gio-design/components';
import { PlusCircleFilled } from '@gio-design/icons';

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
            inputWrapStyle={{ width: 288, margin: '16px 16px 8px' }}
          />
          <List dataSource={options} width={320} height={358} />
          <div style={{ borderTop: '1px solid #DCDFED' }}>
            <Button size="small" type="text" icon={<PlusCircleFilled />} style={{ margin: '8px 16px' }}>
              清除
            </Button>
          </div>
        </>
      }
    >
      <Button type="secondary">这是一个 Select</Button>
    </Dropdown>
  );
};
