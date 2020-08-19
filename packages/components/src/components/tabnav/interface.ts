export type RefKey = React.Key | Symbol | null;
export interface TabNavProps {
  prefixCls?: string;
  className?: string;
  style?: CSSStyleSheet;
  children?: React.ReactNode;
  type?: 'block' | 'line';
  size?: 'large' | 'middle' | 'small' | 'xs';
  onChange?: (_key: RefKey) => void;
  defaultActiveKey?: string;
  activeKey?: string;
}

export interface TabNavItemProps {
  prefixCls?: string;
  children?: React.ReactNode;
  key?: string | number;
  className?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}
