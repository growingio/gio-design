import React from 'react';
import { BreadcrumbSeparatorProps } from './interface';

interface BreadcrumbSeparatorInterface extends React.FC<BreadcrumbSeparatorProps> {
  GIO_BREADCRUMB_SEPARATOR: boolean;
}

const BreadcrumbSeparator: BreadcrumbSeparatorInterface = (props: BreadcrumbSeparatorProps) => {
  const { separator = '/' } = props;
  return <span className="gio-breadcrumb-separator">{separator}</span>;
};

BreadcrumbSeparator.GIO_BREADCRUMB_SEPARATOR = true;
export default BreadcrumbSeparator;
