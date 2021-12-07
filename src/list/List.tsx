import classNames from 'classnames';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { isArray, isEmpty } from 'lodash';
import { useLocale } from '@gio-design/utils';
import { OptionProps, ListProps } from './interfance';
import usePrefixCls from '../utils/hooks/use-prefix-cls';
import { PREFIX } from './constants';
import Item from './Item';
import { convertChildrenToData, convertOptions, getResultValue } from './util';
import WithRef from '../utils/withRef';
import './style';
import { ListContext } from './context';
import useValue from './hooks/useValue';
import useCacheOptions from './hooks/useCacheOptions';
import defaultLocaleTextObject from './locales/zh-CN';
import Empty from './Empty';

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
    isSelection,
  } = context;
  const mergedModel = useMemo(() => model ?? contextModel, [contextModel, model]);
  const mergedDisabled = disabled ?? contextDisabled;
  /** end */

  const { value, onChange } = useValue(
    controlledValue,
    controlledOnChange,
    contextValue,
    contextOnChange,
    mergedModel === 'multiple'
  );

  const cache = useCacheOptions();
  const childNodeOptions = useMemo(
    () => convertChildrenToData(children, { prefix, suffix }),
    [children, prefix, suffix]
  );
  const convertedOptions = useMemo(
    () => convertOptions(initOptions, { prefix, suffix }),
    [initOptions, prefix, suffix]
  );
  const mergedOptions = useMemo(() => [...childNodeOptions, ...convertedOptions], [childNodeOptions, convertedOptions]);

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

  const handleClick = (val?: string) => {
    if (val === `${prefixCls}-collapse`) {
      return;
    }
    onClick?.(val);
    // multiple
    if (isArray(value)) {
      const resultValue = getResultValue(value, val) as string[];
      onChange?.(resultValue as string[], cache?.getOptionsByValue(resultValue as string[]));
    }
    // cascader
    else if (mergedModel === 'cascader') {
      onChange?.(val);
    }
    // normal
    else if (value !== val) {
      onChange?.(val, cache.getOptionsByValue(val));
    }
  };

  const renderChildren = (option: OptionProps) => {
    const renderedItem = renderItem?.(option);
    return (
      <Item {...option} key={option.value}>
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

  const renderExpandedItem = (needCollapse = false) => {
    if (needCollapse) {
      return (
        <Item
          data-testid="list-item-collapse"
          disabled={mergedDisabled}
          key={`${prefixCls}-collapse`}
          value={`${prefixCls}-collapse`}
          onClick={() => setCollapse(Infinity)}
          label={localeTextObject?.expandAll(renderOptions?.length ?? 0)}
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
        model: mergedModel,
        value,
        disabled: mergedDisabled,
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
        {isSelection ? renderContent : <Empty>{renderContent}</Empty>}
      </div>
    </ListContext.Provider>
  );
});

const List: React.ForwardRefExoticComponent<ListProps & React.RefAttributes<HTMLDivElement>> & { isList?: boolean } =
  InnerList;
List.isList = true;
export default List;
