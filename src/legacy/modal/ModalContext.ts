import { createContext } from 'react';
import { defaultRootPrefixCls } from '../config-provider';

const ModalPrefixClsContext = createContext(`${defaultRootPrefixCls}-modal`);

export default ModalPrefixClsContext;
