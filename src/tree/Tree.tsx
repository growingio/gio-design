import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { isArray } from 'lodash';
import { usePrefixCls } from '@gio-design/utils';
import List from './List';
import { TreeItem, TreeItemProps, TreeProps } from './interface';
import { TreeContext } from './context';
import { computeExpandParent, flattenData, transformOptionsToKeyMap, convertChildrenToData } from './util';
import WithRef from '../utils/withRef';
import './style/index';

export const InnerTree = WithRef<HTMLDivElement, TreeProps>((props, ref?) => {
  const {
    prefixCls = 'tree',
    value,
    options,
    className,
    style,
    multiple,
    defaultExpandedKeys,
    defaultSelectedKeys,
    autoExpandParent = true,
    defaultExpandAll,
    selectedKeys: propSelectKeys,
    expandedKeys: propExpandKeys,
    disabled,
    prefix,
    suffix,
    filterTreeNode = () => true,
    onExpand,
    onSelect,
    onClick,
    children,
    ...rest
  } = props;
  const defaultClassName = usePrefixCls(prefixCls);
  const [selectedKeys, setSelectKeys] = useState(defaultSelectedKeys || []);
  const [expandedKeys, setExpandedKeys] = useState<string[] | boolean | undefined>();

  // selectedKeys is control
  useEffect(() => {
    if (isArray(propSelectKeys)) {
      setSelectKeys(propSelectKeys);
    }
  }, [propSelectKeys]);

  const childNodeOptions: TreeItem[] = useMemo(
    () => convertChildrenToData(children, { prefix, suffix }) as TreeItem[],
    [children, prefix, suffix]
  );
  const mergedOptions: TreeItem[] = useMemo(() => {
    if (isArray(options)) {
      return [...childNodeOptions, ...options];
    }
    return [...childNodeOptions];
  }, [childNodeOptions, options]);
  // init fletten options
  // we use fletten options to virutal list
  const flettenOptions = useMemo(
    () => flattenData(mergedOptions, expandedKeys, { disabled, prefix, suffix })?.filter(filterTreeNode),
    [mergedOptions, expandedKeys, disabled, prefix, suffix, filterTreeNode]
  );
  const optionKeyMap = useMemo(() => transformOptionsToKeyMap(mergedOptions), [mergedOptions]);

  useEffect(() => {
    const expandKeys: string[] | boolean | undefined = defaultExpandAll ?? defaultExpandedKeys ?? [];
    if (!expandedKeys) {
      if (autoExpandParent) {
        setExpandedKeys(computeExpandParent(expandKeys, optionKeyMap));
      } else {
        setExpandedKeys(expandKeys);
      }
    }
  }, [optionKeyMap, defaultExpandAll, defaultExpandedKeys, autoExpandParent, expandedKeys]);

  useEffect(() => {
    if (isArray(propExpandKeys)) {
      setExpandedKeys(propExpandKeys);
    }
  }, [autoExpandParent, propExpandKeys]);

  // event select Node
  const onNodeSelect = (node: TreeItem) => {
    let selectKeys = selectedKeys;
    if (selectKeys.includes(node?.value)) {
      if (multiple) {
        selectKeys = selectKeys?.filter((v) => v !== node.value);
      } else {
        selectKeys = [];
      }
    } else if (multiple) {
      selectKeys = [...selectedKeys, node.value];
    } else {
      selectKeys = [node.value];
    }
    const selectedNode = optionKeyMap.get(node.value);
    const selectedNodes = selectKeys?.reduce((prev, val) => {
      if (optionKeyMap.has(val)) {
        return [...prev, optionKeyMap.get(val)];
      }
      return [...prev];
    }, [] as TreeItem[]);

    if (typeof propSelectKeys === 'undefined') {
      setSelectKeys(selectKeys);
    }
    onSelect?.(selectKeys, {
      selected: selectKeys?.includes(node.value),
      node: selectedNode as TreeItemProps,
      selectedNodes: selectedNodes as TreeItemProps[],
    });
  };
  const onNodeExpand = (node: TreeItem) => {
    let expandKeys = expandedKeys;

    // 必定是个父节点
    if (typeof expandKeys === 'boolean' && expandKeys) {
      expandKeys = flettenOptions.map((v) => v.value).filter((v) => v !== node.value);
    } else if (isArray(expandKeys)) {
      if (expandKeys.includes(node.value)) {
        expandKeys = expandKeys.filter((v) => v !== node.value);
      } else {
        // 新增node
        expandKeys = [...(expandKeys as any[]), node.value];
      }
    }
    const { isOpen } = node;
    const expandNode = optionKeyMap.get(node.value);
    const expandNodes = (expandKeys as string[])?.reduce((prev, val) => {
      if (optionKeyMap.has(val)) {
        return [...prev, optionKeyMap.get(val)];
      }
      return [...prev];
    }, [] as TreeItem[]);
    if (typeof propExpandKeys === 'undefined') {
      setExpandedKeys(expandKeys);
    }

    onExpand?.(expandKeys as string[], {
      expanded: !isOpen,
      node: expandNode as TreeItemProps,
      expandNodes: expandNodes as TreeItemProps[],
    });
  };
  return (
    <TreeContext.Provider
      value={{
        value,
        selectedKeys,
        multiple,
        onSelect: onNodeSelect,
        onExpand: onNodeExpand,
        onClick,
      }}
    >
      <div
        className={classNames(defaultClassName, className, {
          [`${defaultClassName}-disabled`]: disabled,
        })}
        ref={ref}
        style={style}
      >
        <List options={flettenOptions} {...rest} />
      </div>
    </TreeContext.Provider>
  );
});

const Tree: React.ForwardRefExoticComponent<TreeProps & React.RefAttributes<HTMLDivElement>> & { isTree?: boolean } =
  InnerTree;
Tree.isTree = true;
export default Tree;
