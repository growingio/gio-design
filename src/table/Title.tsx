import React from 'react';
import classNames from 'classnames';
import { UpFilled, DownFilled, FilterOutlined, QuestionCircleOutlined } from '@gio-design/icons';
import { isEmpty, isString, isUndefined } from 'lodash';
import Button from '../button';
import Tooltip from '../tooltip';
import FilterPopover from './FilterPopover';
import { Key, SortOrder, TitleProps } from './interface';

const getNextSortDirection = (sortDirections: SortOrder[], current: SortOrder): SortOrder =>
  current === null ? sortDirections[0] : sortDirections[sortDirections.indexOf(current) + 1];

const Title = <RecordType,>(props: TitleProps<RecordType>): React.ReactElement => {
  const {
    prefixCls,
    onTriggerStateUpdate,
    sorterState,
    updateSorterStates,
    filterState,
    updateFilterStates,
    sortDirections = [],
    filterSearchPlaceHolder,
    align,
    info,
    title,
  } = props;

  const renderSorter = (): React.ReactNode => {
    if (isUndefined(sorterState)) {
      return null;
    }
    const { sortOrder: sorterOrder } = sorterState;

    const handleSorterChange = (): void => {
      const changedSorterState = { ...sorterState, sortOrder: getNextSortDirection(sortDirections, sorterOrder) };
      onTriggerStateUpdate({ sorterState: updateSorterStates(changedSorterState) });
    };
    return (
      <Button.IconButton className={`${prefixCls}-sorter-button`} type="text" size="small" onClick={handleSorterChange}>
        <>
          <UpFilled
            className={classNames(`${prefixCls}-sorter-button-up`, {
              active: sorterOrder === 'ascend',
            })}
          />
          <DownFilled
            className={classNames(`${prefixCls}-sorter-button-down`, {
              active: sorterOrder === 'descend',
            })}
          />
        </>
      </Button.IconButton>
    );
  };

  const renderFilter = (): React.ReactNode => {
    if (isUndefined(filterState)) {
      return null;
    }
    const { filteredKeys, filters } = filterState;
    const handleFilterPopoverClick = (newFilteredKeys: Key[]): void => {
      onTriggerStateUpdate({ filterStates: updateFilterStates({ ...filterState, filteredKeys: newFilteredKeys }) });
    };

    return (
      <FilterPopover
        prefixCls={prefixCls}
        onClick={handleFilterPopoverClick}
        filters={filters}
        values={filteredKeys}
        placeholder={filterSearchPlaceHolder}
      >
        <Button.IconButton
          size="small"
          type="text"
          className={`${prefixCls}-filter-button`}
          active={!isEmpty(filteredKeys)}
        >
          <FilterOutlined size="12px" />
        </Button.IconButton>
      </FilterPopover>
    );
  };

  const renderInfo = (): React.ReactNode => {
    if (isUndefined(info)) {
      return null;
    }
    return (
      <span className={`${prefixCls}-column-title-info`}>
        <Tooltip title={info} overlayClassName={`${prefixCls}-tooltip`}>
          <QuestionCircleOutlined size="12px" />
        </Tooltip>
      </span>
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
        title={isString(title) ? title : undefined}
      >
        {title}
      </span>
      {renderInfo()}
      {renderSorter()}
      {renderFilter()}
    </div>
  );
};

export default Title;
