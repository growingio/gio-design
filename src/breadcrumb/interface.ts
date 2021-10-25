import React from 'react'

interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {

  /**
   * 自定义分隔符
   * @default /
   */
  separator?: React.ReactNode
}

export default BreadcrumbProps