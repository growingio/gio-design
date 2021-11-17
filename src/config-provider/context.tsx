import React, { useContext, forwardRef } from 'react';

import { SizeType } from './SizeContext';

export interface CSPConfig {
  nonce?: string;
}

export type TGetPrefixCls = (subPrefixCls?: string, customRootPrefixCls?: string) => string;

export interface ConfigConsumerProps {
  getTargetContainer?: () => HTMLElement;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  rootPrefixCls?: string;
  getPrefixCls: TGetPrefixCls;
  csp?: CSPConfig;
  autoInsertSpaceInButton?: boolean;
  input?: {
    autoComplete?: string;
  };
  pageHeader?: {
    ghost: boolean;
  };
  direction?: 'ltr' | 'rtl';
  space?: {
    size?: SizeType | number;
  };
  virtual?: boolean;
  dropdownMatchSelectWidth?: boolean;
}

export const defaultRootPrefixCls = 'gio';

export const getGioDesignPrefixCls: TGetPrefixCls = (subPrefixCls, customRootPrefixCls = 'gio') =>
  [customRootPrefixCls, subPrefixCls].filter((s) => !!s).join('-');

export const ConfigContext = React.createContext<ConfigConsumerProps>({
  rootPrefixCls: defaultRootPrefixCls,
  // We provide a default function for Context without provider
  getPrefixCls: getGioDesignPrefixCls,
});

export const ConfigConsumer = ConfigContext.Consumer;

// =========================== withConfigConsumer ===========================
// We need define many types here. So let's put in the block region
type IReactComponent<P = any> = React.FC<P> | React.ComponentClass<P> | React.ClassicComponentClass<P>;

interface BasicExportProps {
  prefixCls?: string;
}

interface ConsumerConfig {
  subPrefixCls: string;
}

interface ConstructorProps {
  displayName?: string;
}
export function withConfigConsumer<ExportProps extends BasicExportProps>(config: ConsumerConfig) {
  return function withConfigConsumerFunc(
    Component: IReactComponent
  ): React.ForwardRefExoticComponent<React.PropsWithoutRef<ExportProps> & React.RefAttributes<unknown>> {
    // Wrap with ConfigConsumer. Since we need compatible with react 15, be care when using ref methods
    const SFC = forwardRef((props: ExportProps, ref) => {
      const { subPrefixCls } = config;
      const { rootPrefixCls, ...restConfigContext } = useContext(ConfigContext);
      const prefixCls = getGioDesignPrefixCls(subPrefixCls, rootPrefixCls);
      return <Component {...restConfigContext} {...props} prefixCls={prefixCls} ref={ref} />;
    }) as React.ForwardRefExoticComponent<React.PropsWithoutRef<ExportProps> & React.RefAttributes<unknown>>;

    const cons: ConstructorProps = Component.constructor as ConstructorProps;
    const name = cons?.displayName || Component.name || 'Component';

    SFC.displayName = `withConfigConsumer(${name})`;

    return SFC;
  };
}
