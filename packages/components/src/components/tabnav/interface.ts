export interface TabNavProps {
  prefixCls?: string;
  className?: string;
  style?: CSSStyleSheet;
  children?: React.ReactNode;
  type?: 'block' | 'line';
  size?: 'large' | 'middle' | 'small' | 'xs';
  onTabClick?: (_key: string | number) => void;
  onChange?: (_key: string | number) => void;
  defaultActiveKey?: string | number;
  activeKey?: string | number;
}

export interface TabNavItemProps {
  prefixCls?: string;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}
