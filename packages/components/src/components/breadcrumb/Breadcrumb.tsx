import React from 'react';
import classNames from 'classnames';
import BreadcrumbItem from './BreadcrumbItem';
import BreadcrumbSeparator from './BreadcrumbSeparator';
import { ConfigContext } from '../config-provider';

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
}

function getBreadcrumbName(route: Route, params: any) {
  if (!route.breadcrumbName) {
    return null;
  }
  const paramsKeys = Object.keys(params).join('|');
  const name = route.breadcrumbName.replace(
    new RegExp(`:(${paramsKeys})`, 'g'),
    (replacement, key) => params[key] || replacement
  );
  return name;
}

function isLastItem(route: Route, routes: Route[]) {
  return routes.indexOf(route) === routes.length - 1;
}

/* eslint-disable-next-line */
function defaultItemRender(route: Route, params: any, routes: Route[], paths: string[]) {
  const name = getBreadcrumbName(route, params);
  return isLastItem(route, routes) ? <span>{name}</span> : <a href={`/${paths.join('/')}`}>{name}</a>;
}

const getPath = (path: string, params: any) => {
  let result = (path || '').replace(/^\//, '');
  Object.keys(params).forEach((key) => {
    result = result.replace(`:${key}`, params[key]);
  });
  return result;
};

interface BreadcrumbInterface extends React.FC<BreadcrumbProps> {
  Item: typeof BreadcrumbItem;
  Separator: typeof BreadcrumbSeparator;
}

const Breadcrumb: BreadcrumbInterface = ({
  prefixCls: customizePrefixCls,
  separator = '/',
  style,
  className,
  routes,
  children,
  itemRender = defaultItemRender,
  params = {},
  ...restProps
}) => {
  const { getPrefixCls } = React.useContext(ConfigContext);

  let crumbs;
  const prefixCls = getPrefixCls('breadcrumb', customizePrefixCls);
  if (routes && routes.length > 0) {
    const paths: string[] = [];
    crumbs = routes.map((route: Route) => {
      const path = getPath(route.path, params);

      if (path) {
        paths.push(path);
      }
      return (
        <BreadcrumbItem separator={separator} key={path || route.breadcrumbName}>
          {itemRender(route, params, routes, paths)}
        </BreadcrumbItem>
      );
    });
  } else if (children) {
    crumbs = children;
  }
  return (
    <div className={classNames(className, prefixCls)} style={style} {...restProps}>
      {crumbs}
    </div>
  );
};

Breadcrumb.Item = BreadcrumbItem;

Breadcrumb.Separator = BreadcrumbSeparator;

export { BreadcrumbItem, BreadcrumbSeparator };

export default Breadcrumb;
