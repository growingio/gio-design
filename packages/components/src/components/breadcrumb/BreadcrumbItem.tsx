/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import classnames from 'classnames';
import BreadcrumbSeparator from './BreadcrumbSeparator';
import { BreadcrumbItemProps } from './interface';

interface BreadcrumbItemInterface extends React.FC<BreadcrumbItemProps> {
  GIO_BREADCRUMB_ITEM: boolean;
}

const BreadcrumbItem: BreadcrumbItemInterface = (props: BreadcrumbItemProps) => {
  const { children, separator, ...restProps } = props;
  const link =
    'href' in restProps ? (
      <a className="gio-breadcrumb-item-link-target" {...restProps}>
        {children}
      </a>
    ) : (
      <span className="gio-breadcrumb-item-link-target" {...restProps}>
        {children}
      </span>
    );

  if (children) {
    return (
      <span className={classnames('gio-breadcrumb-item', 'gio-breadcrumb-item-link')}>
        {link}
        {separator && separator !== '' && <BreadcrumbSeparator separator={separator} />}
      </span>
    );
  }
  return null;
};

BreadcrumbItem.GIO_BREADCRUMB_ITEM = true;

export default BreadcrumbItem;
