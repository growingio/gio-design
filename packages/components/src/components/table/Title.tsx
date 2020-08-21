import React from 'react';
import classNames from 'classnames';
import { UpFilled, DownFilled, FilterFilled, QuestionCircleOutlined } from '@gio-design/icons';
import Button from '../button';
import Tooltip from '../tooltip';
import FilterPopover from './FilterPopover';
import { ColumnType, SortOrder } from './interface';
import { SortState } from './hook/useSorter';
import { FilterState } from './hook/useFilter';
import { isUndefined } from 'lodash';

interface TitleProps<RecordType> {
  prefixCls: string;
  sorterState?: SortState<RecordType>;
  filterState?: FilterState<RecordType>;
  column: ColumnType<RecordType>;
  updateSorterStates: (sortState: SortState<RecordType>) => void;
  updateFilterStates: (filterState: FilterState<RecordType>) => void;
}

const getNextSortDirection = (sortDirections: SortOrder[], current: SortOrder): SortOrder =>
  current === null ? sortDirections[0] : sortDirections[sortDirections.indexOf(current) + 1];

const Title = <RecordType,>(props: TitleProps<RecordType>) => {
  const { prefixCls, column } = props;

  const renderSorter = () => {
    const { sorterState, updateSorterStates } = props;
    if (isUndefined(sorterState)) {
      return null;
    }
    const { sortDirections = ['ascend', 'descend', null] } = column;
    const { sortOrder: sorterOrder } = sorterState;

    const handleSorterChange = () => {
      updateSorterStates({
        ...sorterState,
        sortOrder: getNextSortDirection(sortDirections, sorterOrder),
      });
    };
    return (
      <span className={classNames(`${prefixCls}-column-sorter`)}>
        <span className={`${prefixCls}-column-sorter-inner`}>
          <Button
            prefixCls={`${prefixCls}`}
            className={`${prefixCls}-column-sorter-inner-btn`}
            type="text"
            icon={
              <>
                <UpFilled
                  className={classNames(`${prefixCls}-column-sorter-up`, {
                    active: sorterOrder === 'ascend',
                  })}
                />
                <DownFilled
                  className={classNames(`${prefixCls}-column-sorter-down`, {
                    active: sorterOrder === 'descend',
                  })}
                />
              </>
            }
            onClick={handleSorterChange}
          />
        </span>
      </span>
    );
  };

  const renderFilter = () => {
    const { filterState, updateFilterStates } = props;
    if (isUndefined(filterState)) {
      return null;
    }
    const { filteredKeys, filters } = filterState;
    const handleFilterPopoverClick = (newFilteredKeys: string[]) =>
      updateFilterStates({ ...filterState, filteredKeys: newFilteredKeys });

    return (
      <span className={classNames(`${prefixCls}-column-filter`)}>
        <span className={`${prefixCls}-column-filter-inner`}>
          <FilterPopover prefixCls={prefixCls} onClick={handleFilterPopoverClick} filters={filters}>
            <Button
              type="assist"
              className={`${prefixCls}-column-filter-inner-btn`}
              icon={
                <FilterFilled
                  size="16px"
                  className={classNames(`${prefixCls}-column-filter-icon`, { active: filteredKeys.length > 0 })}
                />
              }
            />
          </FilterPopover>
        </span>
      </span>
    );
  };

  const renderInfo = () => {
    const { info } = column;
    if (isUndefined(info)) {
      return null;
    }
    return (
      <span className={`${prefixCls}-column-title-info`}>
        <Tooltip title={info}>
          <QuestionCircleOutlined size="16px" />
        </Tooltip>
      </span>
    );
  };

  return (
    <div className={`${prefixCls}-column-title`}>
      <span>
        {column.title}
        {renderInfo()}
      </span>
      {renderSorter()}
      {renderFilter()}
    </div>
  );
};

export default Title;
