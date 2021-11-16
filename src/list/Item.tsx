import React from 'react';
import { ItemProps } from './interfance';
import BaseItem from './inner/baseItem';
import CheckboxItem from './inner/ChckboxItem';
import CalcaderItem from './inner/CascaderItem';
import WithRef from '../utils/withRef';

const Item: React.ForwardRefRenderFunction<HTMLLIElement, ItemProps & { isMultiple?: boolean; isCascader?: boolean }> =
  (props, ref?) => {
    const { label, value, disabled, isMultiple = false, isCascader, selectedParent = [], selectValue, ...rest } = props;

    if (isMultiple) {
      return <CheckboxItem ref={ref} label={label} value={value} disabled={disabled} {...rest} />;
    }
    if (isCascader) {
      return (
        <CalcaderItem
          ref={ref}
          label={label as string}
          value={value as string}
          selectValue={selectValue as string}
          disabled={disabled}
          selectedParent={selectedParent}
          {...rest}
        />
      );
    }
    return <BaseItem ref={ref} label={label} value={value} disabled={disabled} {...rest} />;
  };

export default WithRef(Item);
