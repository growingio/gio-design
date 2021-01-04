import { createContext } from 'react';
import { defaultRootPrefixCls } from '../config-provider';

// eslint-disable-next-line import/prefer-default-export
export const UploadPrefixClsContext = createContext(`${defaultRootPrefixCls}-upload`);
