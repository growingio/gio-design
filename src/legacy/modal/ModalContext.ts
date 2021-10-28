import { createContext } from 'react';
import { defaultRootPrefixCls } from '../../components/config-provider';

const ModalPrefixClsContext = createContext(`${defaultRootPrefixCls}-modal`);

export default ModalPrefixClsContext;
