import { TabsProps as RcTabsProps, TabPaneProps as RcTabPaneProps } from 'rc-tabs';
type allWaysHave = 'children' | 'className' | 'style';
export interface TabProps extends Pick<RcTabsProps, 'prefixCls' | 'onChange' | 'onTabClick' | allWaysHave> {
  type?: 'line' | 'block';
  size?: 'small' | 'middle' | 'large';
}

export interface TabPaneProps extends Pick<RcTabPaneProps, 'tab' | 'disabled' | allWaysHave> {
  icon?: React.ReactNode;
}
