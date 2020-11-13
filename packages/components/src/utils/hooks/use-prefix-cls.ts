import { useContext } from 'react';

import { ConfigContext } from '../../components/config-provider';

const usePrefixCls = (suffixCls?: string, customizePrefixCls?: string): string => {
  const { rootPrefixCls } = useContext(ConfigContext);
  const { customizePrefixCls: prefixCls = rootPrefixCls } = { customizePrefixCls };

  return [prefixCls, suffixCls].filter((s) => !!s).join('-');
};

export default usePrefixCls;
