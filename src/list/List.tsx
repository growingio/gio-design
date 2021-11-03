import classNames from 'classnames';
import React, { useState } from 'react';
import { difference, indexOf, isArray } from 'lodash';
import { OptionProps, ItemProps, ListProps } from './interfance';
import usePrefixCls from '../utils/hooks/use-prefix-cls';
import { PREFIX } from './constants';
import Item from './Item';
import utils from './util';
import WithRef from '../utils/withRef';

const List: React.ForwardRefRenderFunction<HTMLDivElement, ListProps> = (props, ref?) => {
  const {
    className,
    style,
    options: initOptions,
    children,
    disabled = false,
    value: controlledValue,
    isMultiple = false,
    collapse: initCollapse = 10,
    prefix,
    suffix,
    onChange,
  } = props;
  const prefixCls = usePrefixCls(PREFIX);

  // collapse slice
  const [collapse, setCollapse] = useState(initCollapse);

  const selectValue = utils.initValue(isMultiple, controlledValue);
  const options = initOptions ?? React.Children.toArray(children);
  const childrens = options.slice(0, collapse);

  const handleClick = (val: string | number) => {
    if (isArray(selectValue)) {
      onChange?.(indexOf(selectValue, val) !== -1 ? difference(selectValue, [val]) : [...selectValue, val]);
    } else if (selectValue !== val) {
      onChange?.(val);
    }
  };
  const renderChildren = (option: OptionProps) => (
    <Item
      {...option}
      prefix={prefix?.(option)}
      suffix={suffix?.(option)}
      disabled={option?.disabled ?? disabled}
      isMultiple={isMultiple}
      selected={utils.selectedStatus(option?.value, selectValue)}
      onClick={handleClick}
    />
  );

  const renderChildrens = (child: React.ReactNode[] | OptionProps[]) => {
    // options render
    if (isArray(initOptions)) {
      return (child as OptionProps[])?.map((option: OptionProps) => renderChildren(option));
    }
    // childrens render
    return (child as React.ReactNode[]).map((node: React.ReactElement<ItemProps>) => {
      const {
        props: { disabled: itemDisabled, prefix: itemPrefix, suffix: itemSuffix, onClick, ...rest },
      } = node;
      const item = { label: node?.props?.label, value: node?.props?.value };
      return React.cloneElement(node, {
        disabled: itemDisabled ?? disabled,
        prefix: itemPrefix ?? prefix?.(item),
        suffix: itemSuffix ?? suffix?.(item),
        isMultiple,
        selected: utils.selectedStatus(item.value, selectValue),
        onClick: (value: string | number) => {
          handleClick(value);
          onClick?.(value);
        },
        ...rest,
      });
    });
  };

  const renderExpandedItem = (length: number) => {
    if (length > collapse) {
      return (
        <Item value={`${prefixCls}-collapse`} onClick={() => setCollapse(Infinity)}>{`展开全部(${
          length - collapse
        })`}</Item>
      );
    }
    return null;
  };

  return (
    <div className={classNames(prefixCls, className)} style={style} ref={ref}>
      {renderChildrens(childrens)}
      {renderExpandedItem(options?.length)}
    </div>
  );
};

export default WithRef(List);
