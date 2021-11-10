import { useContext } from 'react';

import { ConfigContext } from '../../legacy/config-provider';

const usePrefixCls = (subPrefixCls?: string, customRootPrefixCls?: string): string => {
  const { rootPrefixCls, getPrefixCls } = useContext(ConfigContext);
  return getPrefixCls(subPrefixCls, customRootPrefixCls ?? rootPrefixCls);
};

export default usePrefixCls;
