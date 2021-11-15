import React from 'react';
import List from '../list';
import { Key } from './interface';

interface FilterListProps {
  prefixCls: string;
  value: Key[];
  onChange: (value: Key[]) => void;
  dataSource: {
    value: string;
    label: string;
  }[];
}

const FilterList = ({ prefixCls, value, onChange, dataSource }: FilterListProps) => (
  <List
    className={`${prefixCls}-filter-list`}
    value={value}
    isMultiple
    onChange={(changedKeys) => {
      onChange(Array.isArray(changedKeys) ? changedKeys : [changedKeys]);
    }}
  >
    {dataSource.map((item) => (
      <List.Item key={`${item.label}-${item.value}`} value={item.value}>
        {item.label}
      </List.Item>
    ))}
  </List>
);

export default FilterList;
