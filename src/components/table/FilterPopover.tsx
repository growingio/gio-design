/* eslint-disable react/jsx-wrap-multilines */
import React, { useState, useContext } from 'react';
import Button from '../button';
import Popover from '../popover';
import List from '../list';
import SearchBar from '../search-bar';
import { TableContext } from './Table';

interface FilterPopoverProps {
  prefixCls: string;
  children: React.ReactElement;
  onClick: (newFilterState: string[]) => void;
  filters?: string[];
  values: string[];
}

const FilterPopover = (props: FilterPopoverProps): React.ReactElement => {
  const { children, onClick, filters = [], values } = props;
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
      contentArea={
        <>
          <SearchBar placeholder="搜索过滤条件" size="small" value={seachValue} onChange={setSearchValue} />
          <List
            wrapStyle={{ padding: 0 }}
            isMultiple
            value={selectFilterKeys}
            onChange={setSelectFilterKeys}
            width={220}
            height={160}
            dataSource={filters
              .filter((item: string | number) => item.toString().includes(seachValue))
              .map((item: string | number) => ({ label: item.toString(), value: item.toString() }))}
          />
          <div className="filter-popover-footer">
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
