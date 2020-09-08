import React from 'react';
import classnames from 'classnames';
import BreadcrumbSeparator from './BreadcrumbSeparator';
import { BreadcrumbItemProps } from './interface';

const BreadcrumbItem: React.FC<BreadcrumbItemProps> = (props: BreadcrumbItemProps) => {
  const {
    href, children, separator, isLastItem,
  } = props;
  /* eslint-disable prettier/prettier */
  const link = href ? (
    <a className="gio-breadcrumb-item-link-target" {...props}>
      {children}
    </a>
  ) : (
    <span className="gio-breadcrumb-item-link-target" {...props}>
      {children}
    </span>
  );

  if (children) {
    return (
      <span className={classnames('gio-breadcrumb-item', !isLastItem && 'gio-breadcrumb-item-link')}>
        {link}
        {!isLastItem && <BreadcrumbSeparator separator={separator} />}
      </span>
    );
  }
  return null;
};

export default BreadcrumbItem;
