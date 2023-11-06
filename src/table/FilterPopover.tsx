import React, { useState, useContext, useEffect } from 'react';
import { invoke, isFunction, isObject } from 'lodash';
import { useLocale } from '@gio-design/utils';
import pinyinMatch from 'pinyin-match';
import Button from '../button';
import Popover from '../popover';
import FilterList from './FilterList';
import SearchBar from '../search-bar';
import { TableContext } from './Table';
import { FilterType, Key } from './interface';
import defaultLocale from './locales/zh-CN';
import Result from '../result';

interface FilterPopoverProps {
  prefixCls: string;
  children: React.ReactElement;
  onClick: (newFilterState: Key[]) => void;
  filters?: FilterType[];
  values: Key[];
  /**
   * @default '搜索过滤条件'
   */
  placeholder?: string;
  singleSelect?: boolean;
  filterSearchEnable?: boolean;
  singleSelectDefaultValue?: string;
}

function isContain(target = '', source = ''): boolean {
  if (source === '') {
    return true;
  }
  return !!pinyinMatch.match(target, source);
}

const FilterPopover = (props: FilterPopoverProps): React.ReactElement => {
  const locale = useLocale('Table');
  const { clearText, okText, searchText }: typeof defaultLocale = {
    ...defaultLocale,
    ...locale,
  };

  const {
    children,
    onClick,
    filters = [],
    values,
    prefixCls,
    singleSelect,
    filterSearchEnable,
    placeholder = searchText,
    singleSelectDefaultValue,
  } = props;
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectFilterKeys, setSelectFilterKeys] = useState<Key[]>(values);
  const [visible, setVisible] = useState<boolean>(false);
  const { tableRef } = useContext(TableContext);

  const withClick = (
    trigger: React.ReactElement<{
      onClick?: (event: React.MouseEvent) => void;
    }>
  ) => {
    if (React.isValidElement(trigger)) {
      return React.cloneElement(trigger, {
        onClick: (event: React.MouseEvent) => {
          setVisible((oldVisible) => !oldVisible);
          invoke(trigger, 'props.onClick', event);
        },
      });
    }
    return trigger;
  };

  useEffect(() => {
    if (visible) {
      setSelectFilterKeys(values);
    }
  }, [values, visible]);

  return (
    <Popover
      getContainer={(triggerNode) =>
        (!isFunction(tableRef) && tableRef?.current) || triggerNode.parentElement || document.body
      }
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
      content={
        <>
          {filterSearchEnable && (
            <SearchBar
              placeholder={placeholder}
              size="small"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              className={`${prefixCls}-search-bar`}
              autoFocus
            />
          )}
          <FilterList
            singleSelect={singleSelect}
            prefixCls={prefixCls}
            value={selectFilterKeys}
            singleSelectDefaultValue={singleSelectDefaultValue}
            onChange={(keys) => {
              if (singleSelect) {
                onClick(keys);
                setVisible(false);
                setSelectFilterKeys(keys);
              } else {
                setSelectFilterKeys(keys);
              }
            }}
            empty={searchValue ? <Result type="empty-result" title size="small" /> : undefined}
            dataSource={filters
              .filter((item) => {
                if (isObject(item)) {
                  return isContain(item.label, searchValue);
                }
                return isContain(item.toString(), searchValue);
              })
              .map((item) => {
                if (isObject(item)) {
                  return { value: item.value, label: item.label };
                }
                return { value: item.toString(), label: item.toString() };
              })}
          />
          {!singleSelect && (
            <div className={`${prefixCls}-filter-popover-footer`}>
              <Button
                type="secondary"
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
          )}
        </>
      }
    >
      {withClick(children)}
    </Popover>
  );
};

export default FilterPopover;
