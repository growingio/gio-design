import classNames from 'classnames';
import React, { useMemo } from 'react';
import { isEmpty, isFunction } from 'lodash';
import toArray from 'rc-util/lib/Children/toArray';
import { ListProps, SelectionProps, OptionProps } from './interfance';
import usePrefixCls from '../utils/hooks/use-prefix-cls';
import { PREFIX } from './constants';
import { getFlattenOptions } from '../list-picker/util';
import List from './List';
import { ListContext } from './context';

const Selection: React.FC<SelectionProps> = (props) => {
  const { className, style, options = [], children, ...rest } = props;
  const prefixCls = `${usePrefixCls(PREFIX)}--selection`;
  const isSelection = options?.every((val) => 'groupId' in val) ?? false;
  const selectionOptions: { groupId: string; groupName: string; options: OptionProps[] }[] | OptionProps[] = useMemo(
    () => getFlattenOptions(options, isSelection),
    [isSelection, options]
  );

  if (options.length) {
    return (
      <div className={classNames(prefixCls, className)} style={style}>
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
  }
  if (isFunction(children)) {
    return (
      <div className={classNames(prefixCls, className)} style={style}>
        <ListContext.Consumer>
          {(context) =>
            toArray(children?.(context))?.map((node: React.ReactElement<ListProps>) =>
              !isEmpty(node?.props.options) ||
              React.isValidElement(node.props.children) ||
              !isEmpty(toArray(node.props.children)) ? (
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
              )
            )
          }
        </ListContext.Consumer>
      </div>
    );
  }
  return (
    <div className={classNames(prefixCls, className)} style={style}>
      {toArray(children)?.map(
        (node: React.ReactElement<ListProps>) =>
          (!isEmpty(node?.props.options) ||
            React.isValidElement(node.props.children) ||
            !isEmpty(toArray(node.props.children))) && (
            <div className={`${prefixCls}--item`}>
              {node?.props?.title && <div className={`${prefixCls}--title`}>{node?.props?.title}</div>}
              {React.cloneElement(node, {
                ...rest,
                ...node.props,
              })}
            </div>
          )
      )}
    </div>
  );
};

export default Selection;
