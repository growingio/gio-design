export interface BreadcrumbSeparatorProps {
  separator?: React.ReactNode;
}

export interface BreadcrumbItemProps {
  separator?: React.ReactNode;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLSpanElement>;
  children?: React.ReactNode;
}

export interface Route {
  path: string;
  breadcrumbName: string;
  children?: Omit<Route, 'children'>[];
}

export interface BreadcrumbProps {
  prefixCls?: string;
  routes?: Route[];
  params?: any;
  style?: React.CSSProperties;
  separator?: React.ReactNode;
  className?: string;
  itemRender?: (route: Route, params: any, routes: Array<Route>, paths: Array<string>) => React.ReactNode;
  children?: React.ReactNode;
}
