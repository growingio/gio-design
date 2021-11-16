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
    value={value.map((item) => `${item}`)}
    model="multiple"
    onChange={(changedKeys) => {
      if (!changedKeys) {
        onChange([]);
        return;
      }
      if (Array.isArray(changedKeys)) {
        onChange(changedKeys);
        return;
      }
      onChange([changedKeys]);
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
