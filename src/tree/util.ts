import { isEmpty, isNil } from 'lodash';
import React from 'react';
import { isVaildFunctionCallBack } from '../list/util';
import { TreeItemProps, TreeItem, TreeProps } from './interface';

interface flattenItem extends TreeItemProps {
  isStart?: number;
  isEnd?: number;
  connectKey?: string;
  level?: number;
  parent?: flattenItem;
}

// ReactNode To Options
export function convertNodeToOption(node: React.ReactElement, otherProps?: TreeProps): TreeItem {
  const {
    props: { value, children, label, childs = [], ...restProps },
  } = node as React.ReactElement & { props: TreeItem };
  const option = { value, label, ...restProps };
  const nodeChilds = convertChildrenToData(children, otherProps);
  const prefix = isVaildFunctionCallBack(option, otherProps?.prefix);
  const suffix = isVaildFunctionCallBack(option, otherProps?.suffix);
  return { prefix, suffix, childs: [...childs, ...nodeChilds], ...option };
}

export function convertChildrenToData(nodes?: React.ReactNode, otherProps?: TreeProps): TreeItem[] {
  const nodeOptions: TreeItem[] = [];
  React.Children.forEach(nodes, (node: React.ReactElement) => {
    if (!React.isValidElement(node)) {
      return;
    }
    nodeOptions.push(convertNodeToOption(node, otherProps));
  });
  return nodeOptions;
}

// 扁平化数组,根据expandKeys 来计算是否展开children
export const flattenData = (options: TreeItem[], expandKeys?: string[] | boolean, config?: any): flattenItem[] => {
  const flattenOptions: flattenItem[] = [];
  const expandKeySet = new Set(expandKeys === true ? ([] as any) : expandKeys);
  function dig(list: TreeItem[], parent?: flattenItem | undefined) {
    if (!isNil(list) && !isEmpty(list)) {
      const { length } = list;
      list.forEach((option, index) => {
        const flattenNode = {
          isLeaf: !!isEmpty(option?.childs),
          ...option,
          prefix: config.prefix ?? option.prefix,
          suffix: config.suffix ?? option.suffix,
          disabled: config.disabled ?? option.disabled,
          connectKey: parent ? `${parent.connectKey}-${option.value}` : option.value,
          isStart: parent ? parent?.isStart : index,
          isEnd: parent ? parent?.isEnd : length,
          level: parent ? (parent?.level ?? 0) + 1 : 0,
          isOpen: false,
          parent,
        };
        flattenOptions.push(flattenNode);
        if (expandKeys === true || expandKeySet.has(option.value)) {
          flattenNode.isOpen = true;
          dig(option?.childs ?? [], flattenNode);
        }
      });
    }
  }

  dig(options);
  return flattenOptions;
};

// 将扁平化后数组 转为 key:value形式
export const transformOptionsToKeyMap = (options: TreeItem[]) => {
  const keyMap = new Map<string, TreeItem>();
  function dig(list: TreeItem[], parent?: TreeItem) {
    list.forEach((option) => {
      const optionNode = {
        ...option,
        isOpen: false,
        isLeaf: !!isEmpty(option?.childs),
        parent,
      };
      keyMap.set(optionNode.value, optionNode);
      if (optionNode?.childs) {
        dig(optionNode.childs, optionNode);
      }
    });
  }
  dig(options);
  return keyMap;
};

export function computeExpandParent(
  keyList: string[] | boolean,
  flettenKeyMap: Map<string, flattenItem>
): string[] | boolean {
  if (typeof keyList === 'boolean' && keyList) {
    return keyList;
  }
  const expandedKeys: string[] = [];

  function computeUp(key: string) {
    if (expandedKeys.includes(key)) return;
    const entity = flettenKeyMap.get(key);
    if (!entity) return;
    expandedKeys.push(key);
    const { parent, disabled } = entity;
    if (disabled) return;
    if (parent) {
      computeUp(parent.value);
    }
  }

  ((keyList || []) as string[]).forEach((key) => {
    computeUp(key);
  });

  return [...expandedKeys];
}

export default {
  flattenData,
  transformOptionsToKeyMap,
};
