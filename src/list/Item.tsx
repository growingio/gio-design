import React, { useContext } from 'react';
import { ItemProps } from './interfance';
import BaseItem from './inner/baseItem';
import CheckboxItem from './inner/CheckboxItem';
import CalcaderItem from './inner/CascaderItem';
import WithRef from '../utils/withRef';
import { ListContext } from './context';

export const InnerItem = WithRef<HTMLLIElement, ItemProps>((props, ref?) => {
  const { label, value, disabled, strategy, ...rest } = props;
  const { model } = useContext(ListContext);

  const defaultProps = {
    ref,
    key: value,
    label,
    value,
    disabled,
    ...rest,
  };
  if (model === 'multiple') {
    return <CheckboxItem {...defaultProps} data-testid="list-item-checkbox" />;
  }
  if (model === 'cascader') {
    return (
      <CalcaderItem
        ref={ref}
        data-testid="list-item-cascader"
        label={label as string}
        value={value as string}
        disabled={disabled}
        strategy={strategy}
        {...rest}
      />
    );
  }
  return <BaseItem {...defaultProps} data-testid="list-item-base" />;
});
const Item: React.ForwardRefExoticComponent<ItemProps & React.RefAttributes<HTMLLIElement>> & { isItem?: boolean } =
  InnerItem;
Item.isItem = true;
export default Item;
