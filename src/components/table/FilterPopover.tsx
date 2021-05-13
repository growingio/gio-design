/* eslint-disable react/jsx-wrap-multilines */
import React, { useState, useContext } from 'react';
import { isObject } from 'lodash';
import Button from '../button';
import Popover from '../popover';
import FilterList from './FilterList';
import SearchBar from '../search-bar';
import { TableContext } from './Table';
import { filterType } from './interface';

interface FilterPopoverProps {
  prefixCls: string;
  children: React.ReactElement;
  onClick: (newFilterState: string[]) => void;
  filters?: filterType[];
  values: string[];
}

const FilterPopover = (props: FilterPopoverProps): React.ReactElement => {
  const { children, onClick, filters = [], values, prefixCls } = props;
  const [seachValue, setSearchValue] = useState<string>('');
  const [selectFilterKeys, setSelectFilterKeys] = useState<string[]>(values);
  const [visible, setVisible] = useState<boolean>(false);
  const { tableRef } = useContext(TableContext);
  return (
    <Popover
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      getTooltipContainer={(triggerNode) => tableRef?.current || triggerNode.parentElement!}
      arrowContent={null}
      visible={visible}
      onVisibleChange={setVisible}
      placement="bottomLeft"
      trigger="click"
      overlayClassName={`${prefixCls}-filter-popover`}
      contentArea={
        <>
          <SearchBar placeholder="搜索过滤条件" size="small" value={seachValue} onChange={setSearchValue} />
          <FilterList
            prefixCls={prefixCls}
            value={selectFilterKeys}
            onChange={setSelectFilterKeys}
            dataSource={filters
              .filter((item) => {
                if(isObject(item)) {
                  return item.label.includes(seachValue);
                }
                return item.toString().includes(seachValue);
              })
              .map((item) => {
                if(isObject(item)) {
                  return ({ key: item.value, value: item.label });
                }
                return ({ key: item.toString(), value: item.toString() });
              })
            }
          />
          <div className={`${prefixCls}-filter-popover-footer`}>
            <Button
              style={{ color: '#c7cbd8' }}
              type="text"
              ghost
              size="small"
              onClick={() => {
                setSearchValue('');
                setSelectFilterKeys([]);
              }}
            >
              清除
            </Button>
            <Button
              style={{ float: 'right' }}
              size="small"
              onClick={() => {
                onClick(selectFilterKeys);
                setVisible(false);
              }}
            >
              确定
            </Button>
          </div>
        </>
      }
    >
      {children}
    </Popover>
  );
};

export default FilterPopover;
