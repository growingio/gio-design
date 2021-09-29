export interface BreadcrumbSeparatorProps {
  /**
   * 自定义分隔符
   */
  separator?: React.ReactNode;
}

export interface BreadcrumbItemProps {
  /**
   * 自定义分隔符
   */
  separator?: React.ReactNode;
  /**
   * 链接的目的地
   */
  href?: string;
  /**
   * 单击事件回调函数
   */
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLSpanElement>;
  children?: React.ReactNode;
}

export interface Route {
  path: string;
  breadcrumbName: string;
  children?: Omit<Route, 'children'>[];
}

export interface BreadcrumbProps {
  /**
   * 自定义className前缀
   */
  prefixCls?: string;
  /**
   * router 的路由栈信息
   */
  routes?: Route[];
  /**
   * 路由的参数
   */
  params?: any;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 自定义分隔符
   */
  separator?: React.ReactNode;
  /**
   * 自定义className
   */
  className?: string;
  /**
   * 自定义链接函数，和 react-router 配置使用
   */
  itemRender?: (route: Route, params: any, routes: Array<Route>, paths: Array<string>) => React.ReactNode;
  children?: React.ReactNode;
}
