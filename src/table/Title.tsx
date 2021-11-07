import React from 'react';
import classNames from 'classnames';
import { UpFilled, DownFilled, FilterOutlined, QuestionCircleOutlined } from '@gio-design/icons';
import { isEmpty, isUndefined } from 'lodash';
import Button from '../button';
import Tooltip from '../tooltip';
import FilterPopover from './FilterPopover';
import { SortOrder, TitleProps } from './interface';

export const getNextSortDirection = (sortDirections: SortOrder[], current: SortOrder): SortOrder =>
  current === null ? sortDirections[0] : sortDirections[sortDirections.indexOf(current) + 1];

const Title = <RecordType,>(props: TitleProps<RecordType>): React.ReactElement => {
  const { prefixCls, column, onTriggerStateUpdate } = props;

  const { align } = column;

  const renderSorter = (): React.ReactNode => {
    const { sorterState, updateSorterStates } = props;
    if (isUndefined(sorterState)) {
      return null;
    }
    const { sortDirections = ['ascend', 'descend', null] } = column;
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
    const { filterState, updateFilterStates } = props;
    const { filterSearchPlaceHolder } = column;
    if (isUndefined(filterState)) {
      return null;
    }
    const { filteredKeys, filters } = filterState;
    const handleFilterPopoverClick = (newFilteredKeys: string[]): void => {
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
    const { info } = column;
    if (isUndefined(info)) {
      return null;
    }
    return (
      <span className={`${prefixCls}-column-title-info`}>
        <Tooltip title={info}>
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
      {column.title}
      {renderInfo()}
      {renderSorter()}
      {renderFilter()}
    </div>
  );
};

export default Title;
