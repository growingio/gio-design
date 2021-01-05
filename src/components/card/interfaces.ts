export interface CardProps {
  title?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  disabled?: boolean;
  clickable?: boolean;
  onClick?: () => void;
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
}

export interface CardMetaProps { 
  title?: React.ReactNode;
  description?: React.ReactNode;
  image?: React.ReactElement | string;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}