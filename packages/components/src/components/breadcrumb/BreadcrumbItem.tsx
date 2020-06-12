import React from 'react';
import BreadcrumbSeparator from './BreadcrumbSeparator';
import classnames from 'classnames';

export interface BreadcrumbItemProps {
  separator?: string;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLSpanElement>;
  children?: React.ReactNode;
  isLastItem?: boolean;
}

const BreadcrumbItem: React.FC<BreadcrumbItemProps> = (props: BreadcrumbItemProps) => {
  const { href, children, separator, isLastItem } = props;
  const link = href ? (
    <a className='gio-breadcrumb-item-link-target' {...props}>
      {children}
    </a>
  ) : (
    <span className='gio-breadcrumb-item-link-target' {...props}>
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
