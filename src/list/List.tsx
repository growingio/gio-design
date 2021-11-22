import classNames from 'classnames';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { difference, indexOf, isArray, isEmpty, isNil } from 'lodash';
import { OptionProps, ItemProps, ListProps } from './interfance';
import usePrefixCls from '../utils/hooks/use-prefix-cls';
import { PREFIX } from './constants';
import Item from './Item';
import { convertChildrenToData, isCascader, isMultipe } from './util';
import WithRef from '../utils/withRef';
import './style';
import Popover from '../popover';
import { ListContext } from './context';
import useValue from './hooks/useValue';
import useCacheOptions from './hooks/useCacheOptions';

const selectStatus = (value?: string, values?: string | string[]) => {
  if (!isNil(value)) {
    return isArray(values) ? (values as string[])?.indexOf(value) !== -1 : values === value;
  }
  return undefined;
};

const List: React.ForwardRefRenderFunction<HTMLDivElement, ListProps> & {
  isGIOList?: boolean;
} = (props, ref?) => {
  const {
    id,
    title,
    className,
    style,
    options: initOptions = [],
    children,
    disabled = false,
    value: controlledValue,
    model = 'simple',
    collapse: initCollapse = 10,
    prefix,
    suffix,
    onChange: controlledOnChange,
    showPreview,
    renderItem,
    previewRender,
    previewRenderContainer,
  } = props;

  const prefixCls = usePrefixCls(PREFIX);
  const [collapse, setCollapse] = useState(initCollapse);

  // value and onChange
  const {
    value: contextValue,
    model: contextModel,
    onChange: contextOnChange,
    setOptions: contextSetOptions,
  } = useContext(ListContext);
  const mergedModel = contextModel ?? model;
  const { value, onChange } = useValue(
    controlledValue,
    controlledOnChange,
    contextValue,
    contextOnChange,
    isMultipe(mergedModel)
  );

  const cache = useCacheOptions();
  const childNodeOptions = convertChildrenToData(children);
  const mergedOptions = useMemo(() => [...childNodeOptions, ...initOptions], [childNodeOptions, initOptions]);

  const setOptions = useCallback(
    (options: OptionProps[]) => {
      cache.setOptions(options);
      contextSetOptions?.(options);
    },
    [contextSetOptions, cache]
  );

  useEffect(() => {
    setOptions(mergedOptions);
  }, [mergedOptions, setOptions]);

  const renderOptions = initOptions?.length ? initOptions : React.Children.toArray(children);
  const childrens = renderOptions.slice(0, collapse);
  const isNeedCollapse = useMemo(() => renderOptions?.length > collapse, [renderOptions, collapse]);
  const handleClick = (val: string) => {
    // multiple
    if (isArray(value)) {
      const resultValue = indexOf(value, val) !== -1 ? difference(value, [val]) : [...value, val];
      onChange?.(resultValue, cache.getOptionsByValue(resultValue));
    }
    // cascader
    else if (isCascader(mergedModel)) {
      onChange?.(val, cache.getOptionsByValue(val));
    }
    // normal
    else if (value !== val) {
      onChange?.(val, cache.getOptionsByValue(val));
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
    const renderedItem = renderItem?.(option);
    return (
      <Item
        {...option}
        key={option.value}
        prefix={option?.prefix ?? prefix?.(option)}
        suffix={option?.suffix ?? suffix?.(option)}
        disabled={option?.disabled ?? disabled}
        isMultiple={isMultipe(mergedModel)}
        isCascader={isCascader(mergedModel)}
        selectValue={value}
        selected={selectStatus(option?.value, value)}
        onClick={handleClick}
      >
        {renderedItem}
      </Item>
    );
  };

  const renderChildrens = (child: React.ReactNode[] | OptionProps[]) => {
    // options render
    if (!isEmpty(initOptions)) {
      return (child as OptionProps[])?.map((option: OptionProps) => renderPreview(option, renderChildren(option)));
    }
    // childrens render
    return (child as React.ReactNode[])?.map(
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
          isMultiple: isMultipe(mergedModel),
          isCascader: isCascader(mergedModel),
          selectValue: value,
          selected: selectStatus(item.value, value),
          onClick: (val: string) => {
            handleClick(val);
            onClick?.(val);
          },
        });
      }
    );
  };

  const renderExpandedItem = (needCollapse = false) => {
    if (needCollapse) {
      return (
        <Item
          disabled={disabled}
          key={`${prefixCls}-collapse`}
          value={`${prefixCls}-collapse`}
          onClick={() => setCollapse(Infinity)}
        >{`展开全部(${renderOptions?.length ?? 0})`}</Item>
      );
    }
    return null;
  };

  return (
    <ListContext.Provider value={{ value, onChange, setOptions }}>
      <div className={classNames(prefixCls, className)} style={style} ref={ref} id={id} title={title}>
        {renderChildrens(childrens)}
        {renderExpandedItem(isNeedCollapse)}
      </div>
    </ListContext.Provider>
  );
};
List.isGIOList = true;
export default WithRef(List);
