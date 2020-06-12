import React from 'react';

export interface BreadcrumbSeparatorProps {
  separator?: string;
}

const BreadcrumbSeparator: React.FC<BreadcrumbSeparatorProps> = (props: BreadcrumbSeparatorProps) => {
  const { separator = '/' } = props;
  return <span className='gio-breadcrumb-separator'>{separator}</span>;
};

export default BreadcrumbSeparator;
