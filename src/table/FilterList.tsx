import React from 'react';
import List, { ListProps } from '../list';
import { Key } from './interface';

interface FilterListProps extends ListProps {
  prefixCls: string;
  value: Key[];
  onChange: (value: Key[]) => void;
  dataSource: {
    value: string;
    label: string;
  }[];
}

const FilterList = ({ prefixCls, value, onChange, dataSource, ...otherProps }: FilterListProps) => (
  <List
    className={`${prefixCls}-filter-list`}
    value={value?.filter(Boolean).map(String)}
    model="multiple"
    needEmpty
    onChange={(changedKeys) => {
      if (!changedKeys) {
        onChange([]);
        return;
      }
      if (Array.isArray(changedKeys)) {
        onChange(changedKeys.filter(Boolean));
        return;
      }
      onChange([changedKeys]);
    }}
    {...otherProps}
  >
    {dataSource.map((item) => (
      <List.Item key={`${item.label}-${item.value}`} value={item.value}>
        {item.label}
      </List.Item>
    ))}
  </List>
);

export default FilterList;
