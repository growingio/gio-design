import React from 'react';
import { usePrefixCls } from '@gio-design/utils';
import { BreadcrumbSeparatorProps } from './interface';

interface BreadcrumbSeparatorInterface extends React.FC<BreadcrumbSeparatorProps> {
  GIO_BREADCRUMB_SEPARATOR: boolean;
}

const BreadcrumbSeparator: BreadcrumbSeparatorInterface = (props: BreadcrumbSeparatorProps) => {
  const { separator } = props;
  const prefixCls = usePrefixCls('breadcrumb');
  return <span className={`${prefixCls}-separator`}>{separator}</span>;
};

BreadcrumbSeparator.GIO_BREADCRUMB_SEPARATOR = true;
export default BreadcrumbSeparator;
