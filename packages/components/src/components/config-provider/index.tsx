export { ConfigContext, ConfigConsumer } from './context';

export interface ConfigConsumerProps {
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  getPrefixCls: (suffixCls: string, customizePrefixCls?: string) => string;
  autoInsertSpaceInButton?: boolean;
  virtual?: boolean;
  direction?: 'ltr' | 'rtl';
  dropdownMatchSelectWidth?: boolean;
}
