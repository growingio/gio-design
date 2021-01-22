export interface LayoutProps {
  className?: string;
  prefixCls?: string;
  children?: React.ReactNode | React.ReactNode[];
  style?: React.CSSProperties;
}

export interface LayoutContentProps extends LayoutProps {
  /**
   Content 区域的最大宽度 
  */
  maxWidth?: number | 'auto';
  /*
    Content 区域的外边距
  */
  margin?: number;
}

export interface LayoutSiderProps extends LayoutProps {
  /*
    收缩状态的宽度 
  */
  collapsedWidth?: number;
  /*
    展开状态的宽度
  */
  width?: number;
  /*
    默认的伸缩状态
  */
  defaultCollapsed?: boolean;
  /*  
    控制展开与收缩
  */
  collapsed?: boolean;
  /*
    当伸缩状态变化时的回调函数
  */
  onCollapse?: (collapsed: boolean) => void;
  /*
    悬浮式侧边栏的位置
  */
  suspendedPosition?: 'left' | 'right';
}

export interface SiderState {
  id: string;
  width: number;
  collapsedWidth: number;
  suspendedPosition?: 'left' | 'right';
}

export interface ContentState {
  maxWidth: number;
  margin: number;
}

export interface LayoutState {
  wide: boolean;
}

export interface LayoutContextType {
  layoutState: LayoutState;
  contentState: ContentState;
  setLayoutState: (layoutState: Partial<LayoutState> | (() => Partial<LayoutState>)) => void;
  setContentState: (contentState: Partial<ContentState> | (() => Partial<ContentState>)) => void;
  removeSider: (siderId: string) => void;
  updateSiders: (sider: SiderState) => void;
}
