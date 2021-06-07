/* eslint-disable react/jsx-wrap-multilines */
import React, { useState } from 'react';
import { Button, Dropdown, List, SearchBar } from '@gio-design/components';
import { FilterOutlined } from '@gio-design/icons';

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
  const [visible, setVisible] = useState<boolean>(false);
  const [value, setValue] = useState<string[]>(['a', 'b']);
  return (
    <Dropdown
      visible={visible}
      onVisibleChange={setVisible}
      overlay={
        <div>
          <SearchBar
            id="demo"
            value={searchvalue}
            onChange={setSearchValue}
            inputWrapStyle={{ width: 208, margin: '16px 16px 8px' }}
          />
          <List
            dataSource={options.filter((option) => option.label.includes(searchvalue))}
            width={240}
            height={280}
            value={value}
            isMultiple
            onChange={setValue}
          />
          <div style={{ borderTop: '1px solid #DCDFED' }}>
            <Button
              type="text"
              size="small"
              style={{ margin: '12px 16px' }}
              onClick={() => {
                setValue([]);
              }}
              disabled={value.length === 0}
            >
              清除
            </Button>
            <Button
              size="small"
              style={{ float: 'right', margin: '12px 16px' }}
              onClick={() => {
                setVisible(false);
              }}
            >
              确定
            </Button>
          </div>
        </div>
      }
    >
      <Button type="text" icon={<FilterOutlined />} />
    </Dropdown>
  );
};
