import React, { useState, useMemo } from 'react';
import Button from '../button';
import Popover from '../popover';
import Checkbox, { CheckboxGroup } from '../checkbox';

interface FilterPopoverProps {
  prefixCls: string;
  children: React.ReactElement;
  onClick: (newFilterState: string[]) => void;
  filters?: string[];
}

const FilterPopover = (props: FilterPopoverProps) => {
  const {
    prefixCls, children, onClick, filters = [],
  } = props;
  const [selectFilterKey, setSelectFilterKey] = useState<string[]>([]);
  const filterCheckbox = useMemo(
    () => filters.map((item: string, index: number) => (
      <Checkbox value={item} key={index}>
        {item}
      </Checkbox>
    )),
    [filters],
  );
  return (
    <Popover
      arrowContent={null}
      placement="bottomLeft"
      trigger="click"
      contentArea={(
        <div className={`${prefixCls}-filter-popover`}>
          <CheckboxGroup defaultValue={selectFilterKey} value={selectFilterKey} onChange={setSelectFilterKey}>
            {filterCheckbox}
          </CheckboxGroup>
        </div>
      )}
      footerArea={(
        <Button
          onClick={() => {
            onClick(selectFilterKey);
          }}
        >
          确定
        </Button>
      )}
    >
      {children}
    </Popover>
  );
};

export default FilterPopover;
