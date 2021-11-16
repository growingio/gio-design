import React, { DOMAttributes } from 'react';
import Checkbox from '../../checkbox/Checkbox';
import { PREFIX } from '../constants';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import { BaseItemProps } from '../interfance';
import Item from './baseItem';

const CheckboxItem: React.FC<BaseItemProps & Omit<DOMAttributes<HTMLInputElement | HTMLLIElement>, 'onClick'>> = (
  props
) => {
  const { selected, value, children, onClick, disabled, ...rest } = props;
  const prefixCls = `${usePrefixCls(PREFIX)}--item`;

  const contentRender = (element: React.ReactNode) => (
    <>
      <Checkbox
        checked={selected}
        className={`${prefixCls}--checkbox`}
        value={value}
        disabled={disabled}
        onClick={(e) => {
          onClick?.(value);
          e?.stopPropagation();
        }}
      />
      {element}
    </>
  );
  return (
    <Item disabled={disabled} onClick={onClick} value={value} contentRender={contentRender} {...rest}>
      {children}
    </Item>
  );
};

export default CheckboxItem;
