import React from 'react';
import classNames from 'classnames';
import BreadcrumbItem from './BreadcrumbItem';
import BreadcrumbSeparator from './BreadcrumbSeparator';

export interface Route {
  path: string;
  breadcrumbName: string;
}

export interface BreadcrumbProps {
  routes?: Route[];
  params?: any;
  separator?: string;
  className?: string;
  itemRender?: (route: Route, params: any, routes: Array<Route>, paths: Array<string>) => React.ReactNode;
  children?: React.ReactNode;
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
  return isLastItem(route, routes) ? <span>{name}</span> : <a href={`#/${paths.join('/')}`}>{name}</a>;
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

const Breadcrumb: BreadcrumbInterface = (props: BreadcrumbProps) => {
  const { routes, separator = '/', itemRender = defaultItemRender, params = {}, children } = props;
  let crumbs;
  if (routes && routes.length > 0) {
    const paths: string[] = [];
    crumbs = routes.map((route: Route) => {
      const path = getPath(route.path, params);

      if (path) {
        paths.push(path);
      }

      return (
        <BreadcrumbItem
          separator={separator}
          key={path || route.breadcrumbName}
          {...route}
          isLastItem={isLastItem(route, routes)}
        >
          {itemRender(route, params, routes, paths)}
        </BreadcrumbItem>
      );
    });
  } else if (children) {
    crumbs = children;
  }
  return <div className={classNames(props.className, 'gio-breadcrumb')}>{crumbs}</div>;
};

Breadcrumb.Item = BreadcrumbItem;

Breadcrumb.Separator = BreadcrumbSeparator;

export { BreadcrumbItem, BreadcrumbSeparator };

export default Breadcrumb;
