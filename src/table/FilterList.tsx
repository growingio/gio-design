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
  singleSelect?: boolean;
  singleSelectDefaultValue?: string;
}

const FilterList = ({
  prefixCls,
  value,
  onChange,
  dataSource,
  singleSelect,
  singleSelectDefaultValue,
  ...otherProps
}: FilterListProps) => (
  <List
    className={`${prefixCls}-filter-list`}
    value={value?.length === 0 && singleSelect ? singleSelectDefaultValue : value}
    model={singleSelect ? 'single' : 'multiple'}
    needEmpty
    onClick={(changedKeys) => {
      singleSelect && onChange([changedKeys] as Key[]);
    }}
    onChange={(changedKeys) => {
      !singleSelect && onChange(changedKeys as Key[]);
    }}
    {...otherProps}
  >
    <>
      {dataSource.map((item) => (
        <List.Item key={`${item.label}-${item.value}`} value={item.value}>
          {item.label}
        </List.Item>
      ))}
    </>
  </List>
);

export default FilterList;
