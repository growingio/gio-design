import React from 'react';
import { ItemProps } from './interfance';
import BaseItem from './inner/baseItem';
import CheckboxItem from './inner/ChckboxItem';
import CalcaderItem from './inner/CascaderItem';

const Item: React.FC<ItemProps & { isMultiple?: boolean; isCascader?: boolean }> = (props) => {
  const { label, value, disabled, isMultiple = false, isCascader, selectedParent = [], selectValue, ...rest } = props;

  if (isMultiple) {
    return <CheckboxItem key={value} label={label} value={value} disabled={disabled} {...rest} />;
  }
  if (isCascader) {
    return (
      <CalcaderItem
        key={value}
        label={label as string}
        value={value as string}
        selectValue={selectValue as string}
        disabled={disabled}
        selectedParent={selectedParent}
        {...rest}
      />
    );
  }
  return <BaseItem key={value} label={label} value={value} disabled={disabled} {...rest} />;
};

export default Item;
