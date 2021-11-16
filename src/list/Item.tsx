import React from 'react';
import { ItemProps } from './interfance';
import BaseItem from './inner/baseItem';
import CheckboxItem from './inner/ChckboxItem';
import CalcaderItem from './inner/CascaderItem';

const Item: React.FC<ItemProps & { isMultiple?: boolean; isCascader?: boolean }> = (props) => {
  const { label, value, disabled, isMultiple = false, isCascader, selectedParent = [], selectValue, ...rest } = props;

  if (isMultiple) {
    return <CheckboxItem label={label} value={value} disabled={disabled} {...rest} />;
  }
  if (isCascader) {
    return (
      <CalcaderItem
        label={label as string}
        value={value as string}
        selectValue={selectValue as string}
        disabled={disabled}
        selectedParent={selectedParent}
        {...rest}
      />
    );
  }
  return <BaseItem label={label} value={value} disabled={disabled} {...rest} />;
};

export default Item;
