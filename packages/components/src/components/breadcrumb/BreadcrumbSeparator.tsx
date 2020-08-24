import React from 'react';
import { BreadcrumbSeparatorProps } from './interface';

const BreadcrumbSeparator: React.FC<BreadcrumbSeparatorProps> = (props: BreadcrumbSeparatorProps) => {
  const { separator = '/' } = props;
  return <span className="gio-breadcrumb-separator">{separator}</span>;
};

export default BreadcrumbSeparator;
