import React, { DOMAttributes, useContext, useMemo } from 'react';
import { usePrefixCls } from '@gio-design/utils';
import Checkbox from '../../checkbox/Checkbox';
import { PREFIX } from '../constants';
import { BaseItemProps } from '../interface';
import WithRef from '../../utils/withRef';
import { ListContext } from '../context';
import { selectStatus } from '../util';
import Content from './Content';
import BaseItem, { renderIcon } from './baseItem';

const CheckboxItem: React.ForwardRefRenderFunction<
  HTMLLIElement,
  BaseItemProps & Omit<DOMAttributes<HTMLInputElement | HTMLLIElement>, 'onClick'>
> & { isItem?: boolean } = (props, ref?) => {
  const { value, children, onClick, disabled, selected, label, ...rest } = props;
  const prefixCls = `${usePrefixCls(PREFIX)}--item`;
  const prefixIcon = rest?.prefix ? renderIcon(`${prefixCls}-prefix-icon`, rest?.prefix) : undefined;
  const suffixIcon = rest?.suffix ? renderIcon(`${prefixCls}-prefix-icon`, rest?.suffix) : undefined;
  /** context */
  const context = useContext(ListContext);
  const { value: contextValue, disabled: contextDisabled, onClick: contextOnClick } = context;
  const mergedDisabled = disabled ?? contextDisabled;

  const mergeSelected = useMemo(() => selected ?? selectStatus(value, contextValue), [selected, contextValue, value]);
  const isMax =
    (contextValue as string[])?.length >= (context?.max ?? Infinity) &&
    !(contextValue as [string | number]).includes(value);
  return (
    <BaseItem
      data-testid="list-item"
      ref={ref}
      disabled={mergedDisabled || isMax}
      onClick={onClick}
      value={value}
      label={label}
      {...rest}
    >
      <Checkbox
        checked={mergeSelected}
        className={`${prefixCls}--checkbox`}
        value={value}
        disabled={mergedDisabled || isMax}
        onClick={(e) => {
          if (!mergedDisabled) {
            contextOnClick?.(value, e);
            onClick?.(value, e);
            e?.stopPropagation();
          }
        }}
      />
      {typeof children === 'string' ? (
        <Content label={label ?? children} prefix={prefixIcon} suffix={suffixIcon} />
      ) : (
        children
      )}
    </BaseItem>
  );
};
CheckboxItem.isItem = true;
export default WithRef(CheckboxItem);
