import { createContext } from 'react';
import { defaultRootPrefixCls } from '../config-provider';

const MenuPrefixClsContext = createContext(`${defaultRootPrefixCls}-menu`);

export default MenuPrefixClsContext;
