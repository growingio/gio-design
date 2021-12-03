import React, { useContext } from 'react';
import { ItemProps } from './interfance';
import BaseItem from './inner/baseItem';
import CheckboxItem from './inner/CheckboxItem';
import CalcaderItem from './inner/CascaderItem';
import WithRef from '../utils/withRef';
import { ListContext } from './context';

export const InnerItem = WithRef<HTMLLIElement, ItemProps>((props, ref?) => {
  const { label, value, disabled, ...rest } = props;
  const { model } = useContext(ListContext);
  if (model === 'multiple') {
    return <CheckboxItem ref={ref} label={label} value={value} disabled={disabled} {...rest} />;
  }
  if (model === 'cascader') {
    return <CalcaderItem ref={ref} label={label as string} value={value as string} disabled={disabled} {...rest} />;
  }
  return <BaseItem ref={ref} label={label} value={value} disabled={disabled} {...rest} />;
});
const Item: React.ForwardRefExoticComponent<ItemProps & React.RefAttributes<HTMLLIElement>> & { isItem?: boolean } =
  InnerItem;
Item.isItem = true;
export default Item;
