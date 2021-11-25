import React from 'react';
import { ItemProps } from './interfance';
import BaseItem from './inner/baseItem';
import CheckboxItem from './inner/CheckboxItem';
import CalcaderItem from './inner/CascaderItem';
import WithRef from '../utils/withRef';

export const Item = WithRef<HTMLLIElement, ItemProps & { isMultiple?: boolean; isCascader?: boolean }>(
  (props, ref?) => {
    const { label, value, disabled, isMultiple = false, isCascader, selectValue, ...rest } = props;

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
          {...rest}
        />
      );
    }
    return <BaseItem ref={ref} label={label} value={value} disabled={disabled} {...rest} />;
  }
);

export default Item;
