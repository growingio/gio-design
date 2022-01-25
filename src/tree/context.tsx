import { noop } from 'lodash';
import React from 'react';
import { TreeItem } from './interface';

interface ContextPros {
  selectedKeys?: string[];
  multiple?: boolean;
  onSelect?: (node: TreeItem) => void;
  onExpand?: (node: TreeItem) => void;
  onClick?: (value?: string | number, event?: React.MouseEvent<HTMLLIElement | HTMLInputElement, MouseEvent>) => void;
  value?: string;
}

export const defaultContextValue = {
  value: '',
  multiple: false,
  selectedKeys: undefined as any,
  onSelect: noop,
  onExpand: noop,
  onClick: noop,
};

export const TreeContext = React.createContext<ContextPros>(defaultContextValue);
