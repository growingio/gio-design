import React from 'react';
import classNames from 'classnames';
import { UpFilled, DownFilled, FilterOutlined, QuestionOutlined } from '@gio-design/icons';
import { isEmpty, isString, isUndefined } from 'lodash';
import Button from '../button';
import Tooltip from '../tooltip';
import FilterPopover from './FilterPopover';
import { Key, SortOrder, SortState, TitleProps } from './interface';
import { defaultSortDirections } from './hook/useSorter';

const getNextSortDirection = (sortDirections: SortOrder[], current: SortOrder): SortOrder =>
  current === null ? sortDirections[0] : sortDirections[sortDirections.indexOf(current) + 1];

const Title = <RecordType,>(props: TitleProps<RecordType>): React.ReactElement => {
  const { prefixCls, column, sorterState, updateSorterStates, columnKey } = props;

  const { align, sorter, sortDirections = defaultSortDirections, sortPriorityOrder } = column;

  const renderSorter = (): React.ReactNode => {
    const { sortOrder } = sorterState ?? {};

    if (!sorter) return null;

    const handleSorterChange = (): void => {
      const nextSortOrder = getNextSortDirection(sortDirections, sortOrder ?? null);
      const changedSorterState: SortState<RecordType> = sorterState
        ? {
            ...sorterState,
            sortOrder: nextSortOrder,
          }
        : {
            sortOrder: nextSortOrder,
            column,
            isControlled: 'sortOrder' in column,
            key: columnKey,
            sortDirections,
            sortPriorityOrder,
          };

      updateSorterStates(changedSorterState);
    };

    return (
      <Button.IconButton className={`${prefixCls}-sorter-button`} type="text" size="small" onClick={handleSorterChange}>
        <>
          <UpFilled
            className={classNames(`${prefixCls}-sorter-button-up`, {
              active: sortOrder === 'ascend',
            })}
          />
          <DownFilled
            className={classNames(`${prefixCls}-sorter-button-down`, {
              active: sortOrder === 'descend',
            })}
          />
        </>
      </Button.IconButton>
    );
  };

  const renderFilter = (): React.ReactNode => {
    const { filterState, updateFilterStates } = props;
    if (isUndefined(filterState)) {
      return null;
    }
    const { filteredKeys, filters } = filterState;
    const {
      filterSearchPlaceHolder,
      singleSelect = false,
      filterSearchEnable = true,
      singleSelectDefaultValue = (filters?.[0] as any)?.value,
    } = column;
    const handleFilterPopoverClick = (newFilteredKeys: Key[]): void => {
      updateFilterStates({ ...filterState, filteredKeys: newFilteredKeys });
    };

    return (
      <FilterPopover
        prefixCls={prefixCls}
        onClick={handleFilterPopoverClick}
        filters={filters}
        values={filteredKeys}
        placeholder={filterSearchPlaceHolder}
        singleSelect={singleSelect}
        filterSearchEnable={filterSearchEnable}
        singleSelectDefaultValue={singleSelectDefaultValue}
      >
        <Button.IconButton
          size="small"
          type="text"
          className={`${prefixCls}-filter-button`}
          active={!isEmpty(filteredKeys) || singleSelect}
        >
          <FilterOutlined size="12px" />
        </Button.IconButton>
      </FilterPopover>
    );
  };

  const renderInfo = (): React.ReactNode => {
    const { info } = column;
    if (isUndefined(info)) {
      return null;
    }
    return (
      <Tooltip title={info} overlayClassName={`${prefixCls}-tooltip`}>
        <span className={`${prefixCls}-column-title-info`}>
          <QuestionOutlined size="14px" />
        </span>
      </Tooltip>
    );
  };

  const cls = classNames(`${prefixCls}-column-title`, {
    [`${prefixCls}-column-title-align-left`]: align === 'left',
    [`${prefixCls}-column-title-align-center`]: align === 'center',
    [`${prefixCls}-column-title-align-right`]: align === 'right',
  });

  return (
    <div className={cls}>
      <span
        className={classNames(`${prefixCls}-column-title-text`, `${prefixCls}-column-title-text-ellipsis`)}
        title={isString(column.title) ? column.title : undefined}
      >
        {column.title}
      </span>
      {renderInfo()}
      {renderSorter()}
      {renderFilter()}
    </div>
  );
};

export default Title;
