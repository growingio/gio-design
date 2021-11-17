import classNames from 'classnames';
import React, { useMemo, useState } from 'react';
import { difference, indexOf, isArray } from 'lodash';
import { OptionProps, ItemProps, ListProps } from './interfance';
import usePrefixCls from '../utils/hooks/use-prefix-cls';
import { PREFIX } from './constants';
import Item from './Item';
import utils, { isCascader, isMultipe, useCacheOptions } from './util';
import WithRef from '../utils/withRef';
import './style';
import BaseItem from './inner/baseItem';
import Popover from '../popover';

const List: React.ForwardRefRenderFunction<HTMLDivElement, ListProps> & {
  isGIOList?: boolean;
} = (props, ref?) => {
  const {
    id,
    title,
    className,
    style,
    options: initOptions,
    children,
    disabled = false,
    value: controlledValue,
    model = 'simple',
    collapse: initCollapse = 10,
    prefix,
    suffix,
    onChange,
    selectedParent = [],
    showPreview,
    renderItem,
    previewRender,
    previewRenderContainer,
  } = props;
  const prefixCls = usePrefixCls(PREFIX);
  const { setCacheOptions, getOptionsByValue } = useCacheOptions();
  setCacheOptions(initOptions);
  // collapse slice
  const [collapse, setCollapse] = useState(initCollapse);

  const selectValue = useMemo(() => utils.initValue(isMultipe(model), controlledValue), [controlledValue, model]);
  const options = initOptions ?? React.Children.toArray(children);
  const childrens = options.slice(0, collapse);

  const handleClick = (val: string) => {
    // multiple
    if (isArray(selectValue)) {
      const value = indexOf(selectValue, val) !== -1 ? difference(selectValue, [val]) : [...selectValue, val];
      onChange?.(value, getOptionsByValue(value));
    }
    // cascader
    else if (isCascader(model)) {
      onChange?.(val, getOptionsByValue(val?.split('.')));
    }
    // normal
    else if (selectValue !== val) {
      // debugger;
      onChange?.(val, getOptionsByValue(val));
    }
  };
  const renderPreview = (option: OptionProps, content: React.ReactElement) => {
    if (showPreview) {
      return (
        <div className={`${prefixCls}--preview`}>
          <Popover
            placement="rightTop"
            strategy="fixed"
            getContainer={previewRenderContainer}
            content={previewRender?.(option)}
            overlayClassName={`${prefixCls}--preview--overlay`}
          >
            {content}
          </Popover>
        </div>
      );
    }
    return content;
  };
  const renderChildren = (option: OptionProps) => {
    if (typeof renderItem === 'function') {
      const renderedItem = renderItem(option);
      return (
        <BaseItem
          {...option}
          key={option.value}
          prefix={prefix?.(option)}
          suffix={suffix?.(option)}
          disabled={option?.disabled ?? disabled}
          selected={utils.selectedStatus(option?.value, selectValue)}
          onClick={handleClick}
        >
          {renderedItem}
        </BaseItem>
      );
    }
    return (
      <Item
        {...option}
        key={option.value}
        prefix={prefix?.(option)}
        suffix={suffix?.(option)}
        disabled={option?.disabled ?? disabled}
        isMultiple={isMultipe(model)}
        isCascader={isCascader(model)}
        selectValue={selectValue}
        selected={utils.selectedStatus(option?.value, selectValue)}
        onClick={handleClick}
      />
    );
  };

  const renderChildrens = (child: React.ReactNode[] | OptionProps[]) => {
    // options render
    if (isArray(initOptions)) {
      return (child as OptionProps[])?.map((option: OptionProps) => renderPreview(option, renderChildren(option)));
    }
    // childrens render
    return (child as React.ReactNode[]).map(
      (node: React.ReactElement<ItemProps & { isMultiple: boolean; isCascader: boolean }>) => {
        const {
          props: { disabled: itemDisabled, prefix: itemPrefix, suffix: itemSuffix, onClick, ...rest },
        } = node;

        const item = { label: node?.props?.label, value: node?.props?.value } as OptionProps;
        return React.cloneElement(node, {
          ...rest,
          disabled: itemDisabled ?? disabled,
          prefix: itemPrefix ?? prefix?.(item),
          suffix: itemSuffix ?? suffix?.(item),
          isMultiple: isMultipe(model),
          isCascader: isCascader(model),
          selectedParent,
          selectValue,
          selected: utils.selectedStatus(item.value, selectValue),
          onClick: (value: string) => {
            handleClick(value);
            onClick?.(value);
          },
        });
      }
    );
  };

  const renderExpandedItem = (length: number) => {
    if (length > collapse) {
      return (
        <Item
          disabled={disabled}
          key={`${prefixCls}-collapse`}
          value={`${prefixCls}-collapse`}
          onClick={() => setCollapse(Infinity)}
        >{`展开全部(${length - collapse})`}</Item>
      );
    }
    return null;
  };

  return (
    <div className={classNames(prefixCls, className)} style={style} ref={ref} id={id} title={title}>
      {renderChildrens(childrens)}
      {renderExpandedItem(options?.length)}
    </div>
  );
};
List.isGIOList = true;
export default WithRef(List);
