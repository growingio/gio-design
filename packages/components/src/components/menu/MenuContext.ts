import { createContext } from 'react';
import { defaultRootPrefixCls } from '../config-provider';

export const MenuContext = createContext({
  prefixCls: `${defaultRootPrefixCls}-menu`,
  verticalIndent: 16,
});

export const SubMenuContext = createContext({
  inSubMenu: false,
  inIconSubMenu: false,
});
