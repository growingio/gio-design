import classNames from 'classnames';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { isArray, isEmpty } from 'lodash';
import { useLocale, usePrefixCls } from '@gio-design/utils';
import { OptionProps, ListProps } from './interfance';
import { PREFIX } from './constants';
import Item from './Item';
import { convertChildrenToData, convertOptions, getResultValue } from './util';
import WithRef from '../utils/withRef';
import { ListContext } from './context';
import useValue from './hooks/useValue';
import useCacheOptions from './hooks/useCacheOptions';
import defaultLocaleTextObject from './locales/zh-CN';
import Empty from './Empty';
import BaseItem from './inner/baseItem';

export const InnerList = WithRef<HTMLDivElement, ListProps>((props, ref?) => {
  const {
    id,
    title,
    className,
    style,
    options: initOptions = [],
    children,
    disabled,
    value: controlledValue,
    model,
    collapse: initCollapse = 10,
    prefix,
    suffix,
    onChange: controlledOnChange,
    renderItem,
    onClick,
    itemStrategy,
    empty,
    max,
    needEmpty = false,
    valueSeparator,
    onMultipleOverflow,
    ...listRestProps
  } = props;

  const localeTextObject: typeof defaultLocaleTextObject = useLocale('List') || defaultLocaleTextObject;

  const prefixCls = usePrefixCls(PREFIX);
  const [collapse, setCollapse] = useState(initCollapse);

  /** context */
  const context = useContext(ListContext);
  const {
    value: contextValue,
    model: contextModel = 'single',
    disabled: contextDisabled,
    onChange: contextOnChange,
    setOptions: contextSetOptions,
    getOptionTreeByValue: contextGetOptionTreeByValue,
    isSelection,
  } = context;
  const mergedModel = useMemo(() => model ?? contextModel, [contextModel, model]);
  const mergedEmpty = empty ?? context.emptyNode;
  const mergedIsEmpty = needEmpty || context.isEmpty;
  const mergedDisabled = disabled ?? contextDisabled;
  const mergedMax = max ?? context.max;
  /** end */

  const { value, onChange } = useValue(
    controlledValue,
    controlledOnChange,
    contextValue,
    contextOnChange,
    mergedModel === 'multiple'
  );
  // init and merged options
  const childNodeOptions = useMemo(
    () => convertChildrenToData(children, { prefix, suffix }),
    [children, prefix, suffix]
  );
  const convertedOptions = useMemo(
    () => convertOptions(initOptions, { prefix, suffix }),
    [initOptions, prefix, suffix]
  );

  const mergedOptions = useMemo(() => [...childNodeOptions, ...convertedOptions], [childNodeOptions, convertedOptions]);

  // multipleOverflow hook
  useEffect(() => {
    if(mergedModel === 'multiple' && isArray(value)){
      if((value as string[])?.length >= (max ?? Infinity)){
        onMultipleOverflow?.(value as (string | number)[])
      }
    }
  }, [mergedModel,value, max, onMultipleOverflow])
  
  // set options
  const cache = useCacheOptions();
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

  // event
  const handleClick = (val?: string, event?: React.MouseEvent<HTMLLIElement | HTMLInputElement>) => {
    if (val === `${prefixCls}-collapse`) {
      return;
    }
    onClick?.(val, event);
    // multiple
    if (isArray(value)) {
      const resultValue = getResultValue(value, val) as string[];
      onChange?.(resultValue as string[], cache?.getOptionsByValue(resultValue as string[]));
    }
    // cascader
    else if (mergedModel === 'cascader') {
      onChange?.(
        val,
        contextGetOptionTreeByValue?.(val, valueSeparator, mergedModel) ??
          cache?.getOptionTreeByValue(val, valueSeparator, mergedModel)
      );
    }
    // normal
    else if (value !== val) {
      onChange?.(val, cache.getOptionsByValue(val));
    }
  };

  // render
  const renderChildren = (option: OptionProps) => {
    const renderedItem = renderItem?.(option);
    return (
      <Item {...option} strategy={itemStrategy} key={option.value}>
        {renderedItem}
      </Item>
    );
  };

  const renderChildrens = (childs: React.ReactNode[] | OptionProps[]) => {
    // options render
    if (!isEmpty(initOptions)) {
      return (childs as OptionProps[])?.map((option: OptionProps) => renderChildren(option));
    }
    // childrens render
    return childs;
  };
  if (mergedOptions.length === 0) {
    if (isSelection || !mergedIsEmpty) {
      return <></>;
    }
    return (
      <div
        className={classNames(`${prefixCls}`, className, {
          [`${usePrefixCls('cascader')}`]: mergedModel === 'cascader',
          [`${usePrefixCls('list')}--empty`]: mergedOptions.length === 0,
        })}
        data-testid="list-empty"
        style={style}
        ref={ref}
        id={id}
        title={title}
      >
        <Empty emptyNode={mergedEmpty} />
      </div>
    );
  }
  const renderExpandedItem = (needCollapse = false) => {
    if (needCollapse) {
      return (
        <BaseItem
          data-testid="list-item-collapse"
          disabled={mergedDisabled}
          key={`${prefixCls}-collapse`}
          value={`${prefixCls}-collapse`}
          onClick={() => setCollapse(Infinity)}
          label={localeTextObject?.expandAll(renderOptions?.length - collapse ?? 0)}
        />
      );
    }
    return <></>;
  };
  const renderContent = (
    <>
      {renderChildrens(childrens)}
      {renderExpandedItem(isNeedCollapse)}
    </>
  );

  return (
    <ListContext.Provider
      value={{
        ...context,
        max: mergedMax,
        model: mergedModel,
        isEmpty: mergedIsEmpty,
        emptyNode: mergedEmpty,
        value,
        disabled: mergedDisabled,
        getLabelByValue: context.getLabelByValue ?? cache.getLabelByValue,
        getOptionTreeByValue: context.getOptionTreeByValue ?? cache.getOptionTreeByValue,
        getOptionByValue: context.getOptionByValue ?? cache.getOptionByValue,
        getOptionsByValue: context.getOptionsByValue ?? cache.getOptionsByValue,
        prefix,
        suffix,
        onChange,
        setOptions,
        onClick: handleClick,
      }}
    >
      <div
        className={classNames(`${prefixCls}`, className, {
          [`${usePrefixCls('cascader')}`]: mergedModel === 'cascader',
        })}
        data-testid="list"
        style={style}
        ref={ref}
        id={id}
        title={title}
        {...listRestProps}
      >
        {isSelection || !mergedIsEmpty ? renderContent : <Empty emptyNode={mergedEmpty}>{renderContent}</Empty>}
      </div>
    </ListContext.Provider>
  );
});

const List: React.ForwardRefExoticComponent<ListProps & React.RefAttributes<HTMLDivElement>> & { isList?: boolean } =
  InnerList;
List.isList = true;
export default List;
