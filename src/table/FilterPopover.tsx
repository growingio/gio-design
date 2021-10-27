/* eslint-disable react/jsx-wrap-multilines */
import React, { useState, useContext, useEffect } from 'react';
import { isObject } from 'lodash';
import { useLocale } from '@gio-design/utils';
import Button from '../legacy/button';
import Popover from '../popover';
import FilterList from './FilterList';
import SearchBar from '../legacy/search-bar';
import { TableContext } from './Table';
import { filterType } from './interface';
import defaultLocale from './locales/zh-CN';

interface FilterPopoverProps {
  prefixCls: string;
  children: React.ReactElement;
  onClick: (newFilterState: string[]) => void;
  filters?: filterType[];
  values: string[];
  placeholder?: string;
}

const FilterPopover = (props: FilterPopoverProps): React.ReactElement => {
  const { children, onClick, filters = [], values, prefixCls, placeholder = '搜索过滤条件' } = props;
  const [seachValue, setSearchValue] = useState<string>('');
  const [selectFilterKeys, setSelectFilterKeys] = useState<string[]>(values);
  const [visible, setVisible] = useState<boolean>(false);
  const { tableRef } = useContext(TableContext);

  const locale = useLocale('Table');
  const { clearText, okText }: { clearText: string; okText: string } = {
    ...defaultLocale,
    ...locale,
  };

  useEffect(() => {
    setSelectFilterKeys(values);
  }, [values, visible]);

  return (
    <Popover
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      getTooltipContainer={(triggerNode) => tableRef?.current || triggerNode.parentElement!}
      arrowContent={null}
      visible={visible}
      onVisibleChange={(_visible: boolean) => {
        setVisible(_visible);
        if (_visible === false) {
          setSearchValue('');
          setSelectFilterKeys(values);
        }
      }}
      placement="bottomLeft"
      trigger="click"
      overlayClassName={`${prefixCls}-filter-popover`}
      contentArea={
        <>
          <SearchBar placeholder={placeholder} size="small" value={seachValue} onChange={setSearchValue} />
          <FilterList
            prefixCls={prefixCls}
            value={selectFilterKeys}
            onChange={setSelectFilterKeys}
            dataSource={filters
              .filter((item) => {
                if (isObject(item)) {
                  return item.label.includes(seachValue);
                }
                return item.toString().includes(seachValue);
              })
              .map((item) => {
                if (isObject(item)) {
                  return { key: item.value, value: item.label };
                }
                return { key: item.toString(), value: item.toString() };
              })}
          />
          <div className={`${prefixCls}-filter-popover-footer`}>
            <Button
              style={{ color: '#c7cbd8' }}
              type="text"
              size="small"
              onClick={() => {
                setSearchValue('');
                setSelectFilterKeys([]);
              }}
            >
              {clearText}
            </Button>
            <Button
              style={{ float: 'right' }}
              size="small"
              onClick={() => {
                onClick(selectFilterKeys);
                setVisible(false);
              }}
            >
              {okText}
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
