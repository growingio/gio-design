export interface TabProps {
  type?: 'line' | 'block';
  size?: 'small' | 'middle' | 'large';
  onTabClick?: (key: string | number) => void;
  onChange?: (key: string | number) => void;
  activeKey?: string;
  defaultActiveKey?: string;
  children?: React.ReactNode;
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
}

export interface TabPaneProps {
  tab?: React.ReactNode;
  disabled?: boolean;
  children?: React.ReactNode;
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
}
