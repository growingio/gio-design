export { ConfigContext, ConfigConsumer } from './context';

export interface ConfigConsumerProps {
  getPrefixCls: (suffixCls: string, customizePrefixCls?: string) => string;
  autoInsertSpaceInButton?: boolean;
  virtual?: boolean;
}
