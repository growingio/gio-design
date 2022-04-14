export interface CollapseProps {
  activeKey?: React.Key | React.Key[];
  defaultActiveKey?: React.Key | React.Key[];
  /** 手风琴效果 */
  accordion?: boolean;

  destroyOnHide?: boolean;
  onChange?: (key: React.Key | React.Key[]) => void;
  style?: React.CSSProperties;
  className?: string;

  /**
   * 是否显示边框
   * @default true
   */
  bordered?: boolean;
  prefixCls?: string;
  expandIcon?: (panelProps: PanelProps) => React.ReactNode;
  disabled?: boolean;

  /**
   * @deprecated
   */
  dataTestId?: string;
  'data-testid'?: string;
  children: React.ReactNode;
}
export interface PanelProps {
  isActive?: boolean;
  header?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  showArrow?: boolean;
  forceRender?: boolean;
  extra?: React.ReactNode;
}

export interface CollapsePanelProps {
  key: string | number;
  header: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  showArrow?: boolean;
  prefixCls?: string;
  forceRender?: boolean;
  id?: string;
  extra?: React.ReactNode;
}
