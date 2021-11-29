import React from 'react';

interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * 自定义分隔符
   * @default /
   */
  separator?: React.ReactNode;
}

export default BreadcrumbsProps;
