import React from 'react';
import { without, concat } from 'lodash';
import List from '../components/list';
import Checkbox from '../checkbox';

interface FilterListProps {
  prefixCls: string;
  value: string[];
  onChange: (value: string[]) => void;
  dataSource: {
    key: string;
    value: string;
  }[];
}

const FilterList = ({ prefixCls, value, onChange, dataSource }: FilterListProps) => (
  <List className={`${prefixCls}-filter-list`}>
    {dataSource.map((item) => (
      <List.Item
        key={item.key}
        className={`${prefixCls}-filter-list-item`}
        onClick={() => {
          onChange(value.includes(item.key) ? without(value, item.key) : concat(value, item.key));
        }}
      >
        <Checkbox checked={value.includes(item.key)} />
        {item.value}
      </List.Item>
    ))}
  </List>
);

export default FilterList;
