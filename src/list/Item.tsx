import React from 'react';
import { ItemProps } from './interfance';
import BaseItem from './inner/baseItem';

const Item: React.FC<ItemProps> = (props) => {
  const { label, value, disabled, onClick, ...rest } = props;

  const handleClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    console.log('执行');
    if (!disabled) {
      onClick?.(value);
      e.stopPropagation();
    }
  };

  return (
    <BaseItem key={value} label={label} value={value} disabled={disabled} onClick={(e) => handleClick(e)} {...rest} />
  );
};

export default Item;
