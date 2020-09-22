/* eslint-disable react/jsx-wrap-multilines */
import React, { useState } from 'react';
import { Button, Dropdown, List, SearchBar } from '@gio-design/components';
import { PlusCircleFilled } from '@gio-design/icons';

const options = [
  { value: 'a', label: '实时监控看板' },
  { value: 'b', label: 'Web 端获客看板' },
  { value: 'c', label: '移动端获客看板' },
  { value: 'd', label: '渠道分析' },
  { value: 'e', label: '市场落地页分析' },
  { value: 'f', label: '华北区广告投放分析' },
  { value: 'g', label: '华东区广告投放分析' },
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
            onChange={setSearchValue}
            inputWrapStyle={{ width: 288, margin: '16px 16px 8px' }}
          />
          <List dataSource={options.filter((option) => option.label.includes(searchvalue))} width={320} height={280} />
          <div style={{ borderTop: '1px solid #DCDFED' }}>
            <Button size="small" type="text" icon={<PlusCircleFilled />} style={{ margin: '8px 16px' }}>
              新建活动
            </Button>
          </div>
        </>
      }
    >
      <Button type="secondary">这是一个 Select</Button>
    </Dropdown>
  );
};
