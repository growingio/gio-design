import { createContext } from 'react';
import { defaultRootPrefixCls } from '../legacy/config-provider';

export const MenuContext = createContext({
  prefixCls: `${defaultRootPrefixCls}-menu`,
  verticalIndent: 20,
  inlineCollapsed: false,
});

export const SubMenuContext = createContext({
  inSubMenu: false,
  inIconSubMenu: false,
});

export const getInlineIndent = (verticalIndent: number, inSubMenu: boolean, inIconSubMenu: boolean): number => {
  let inlineIndent = verticalIndent;
  if (inSubMenu && inIconSubMenu) {
    inlineIndent = verticalIndent + 4;
  }
  if (inSubMenu && !inIconSubMenu) {
    inlineIndent = verticalIndent / 2;
  }
  return inlineIndent;
};
