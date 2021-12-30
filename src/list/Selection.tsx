import classNames from 'classnames';
import React, { useContext, useMemo } from 'react';
import { isEmpty, isFunction } from 'lodash';
import toArray from 'rc-util/lib/Children/toArray';
import { usePrefixCls } from '@gio-design/utils';
import { ListProps, SelectionProps, OptionProps } from './interfance';
import { PREFIX } from './constants';
import { getFlattenOptions } from '../list-picker/util';
import List from './List';
import { ListContext } from './context';
import useCacheOptions from './hooks/useCacheOptions';
import Empty from './Empty';

type nodeType = React.ReactElement<ListProps> & { type: { isGIOList: boolean; isRecent: boolean } };

const Selection: React.FC<SelectionProps> & { isSelection?: boolean } = (props) => {
  const { className, style, options = [], children, empty, ...rest } = props;
  const prefixCls = `${usePrefixCls(PREFIX)}--selection`;
  const isSelection = options?.every((val) => 'groupId' in val) ?? false;

  const selectionOptions: { groupId: string; groupName: string; options: OptionProps[] }[] | OptionProps[] = useMemo(
    () => getFlattenOptions(options, isSelection),
    [isSelection, options]
  );
  const cache = useCacheOptions();
  const contextVal = useContext(ListContext);
  const { setOptions: contextSetOptions, onChange: contextOnChange, emptyNode, isEmpty: needEmpty } = contextVal;
  const setOptions = (opts?: OptionProps[]) => {
    cache?.setOptions(opts);
    contextSetOptions?.(opts);
  };
  const IsRenderSelectionItem = (node: nodeType) => {
    if (node?.type?.isRecent) {
      return false;
    }
    return (
      !isEmpty(node?.props.options) ||
      React.isValidElement(node.props.children) ||
      !isEmpty(toArray(node.props.children))
    );
  };

  const renderContent = (node: nodeType) =>
    IsRenderSelectionItem(node) ? (
      <div className={`${prefixCls}--item`}>
        {node?.props?.title && <div className={`${prefixCls}--title`}>{node?.props?.title}</div>}
        {React.cloneElement(node, {
          ...rest,
          ...node.props,
        })}
      </div>
    ) : (
      React.cloneElement(node, {
        ...rest,
        ...node.props,
      })
    );
  const selectionProvider = (child: React.ReactNode) => (
    <ListContext.Provider
      value={{
        ...contextVal,
        options: cache.options,
        isSelection: true,
        onChange: contextOnChange,
        setOptions,
      }}
    >
      {child}
    </ListContext.Provider>
  );
  if (options.length) {
    const renderOptionsChildren = (
      <div className={classNames(prefixCls, className)} style={style}>
        {toArray(children)?.map((node: nodeType) => renderContent(node))}
        {isSelection &&
          (selectionOptions as { groupId: string; groupName: string; options: OptionProps[] }[])?.map(
            (option) =>
              !isEmpty(option.options) && (
                <div className={`${prefixCls}--item`}>
                  {option?.groupId && <div className={`${prefixCls}--title`}>{option?.groupName}</div>}
                  <List options={option.options} />
                </div>
              )
          )}
        {!isSelection && !isEmpty(selectionOptions) && <List options={selectionOptions as OptionProps[]} />}
      </div>
    );
    return selectionProvider(
      needEmpty ? <Empty emptyNode={empty ?? emptyNode}>{renderOptionsChildren}</Empty> : renderOptionsChildren
    );
  }

  if (isFunction(children)) {
    const renderFunctionChildren = (
      <div className={classNames(prefixCls, className)} style={style}>
        <ListContext.Consumer>
          {(context) => toArray(children?.(context))?.map((node: nodeType) => renderContent(node))}
        </ListContext.Consumer>
      </div>
    );
    return selectionProvider(renderFunctionChildren);
  }

  const renderNormal = (
    <div className={classNames(prefixCls, className)} style={style}>
      {toArray(children)?.map((node: nodeType) => renderContent(node))}
    </div>
  );
  return selectionProvider(needEmpty ? <Empty emptyNode={empty ?? emptyNode}>{renderNormal}</Empty> : renderNormal);
};
Selection.isSelection = true;
export default Selection;
