/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import classNames from 'classnames';
import toArray from 'rc-util/lib/Children/toArray';
import { usePrefixCls } from '@gio-design/utils';
import BreadcrumbItem from './BreadcrumbItem';
import BreadcrumbSeparator from './BreadcrumbSeparator';
import { cloneElement } from '../utils/reactNode';
import devWarning from '../utils/devWarning';
import { Route, BreadcrumbProps } from './interface';

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
}: BreadcrumbProps) => {
  let crumbs;
  const prefixCls = usePrefixCls('breadcrumb', customizePrefixCls);
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
    crumbs = toArray(children).map((element: any, index) => {
      if (!element) {
        return element;
      }

      devWarning(
        element.type && (element.type.GIO_BREADCRUMB_ITEM === true || element.type.GIO_BREADCRUMB_SEPARATOR === true),
        'Breadcrumb',
        "Only accepts Breadcrumb.Item and Breadcrumb.Separator as it's children"
      );

      return cloneElement(element, {
        separator,
        key: index,
      });
    });
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
