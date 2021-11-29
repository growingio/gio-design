import React from 'react';

export interface PageProps {
  /**
   * 预制类型，使用组件自带的图片和描述
   */
  type?:
    | 'empty'
    | 'noData'
    | 'noResult'
    | 'noFind'
    | 'noAuth'
    | 'noResource'
    | 'noShared'
    | 'type304'
    | 'type404'
    | 'type500';
  /**
   * 外层classname
   */
  className?: string;
  /**
   * 外层容器style
   */
  style?: React.CSSProperties;
  /**
   * 图片预图案
   */
  image?: React.ReactNode;
  /**
   * 自定义描述内容
   */
  description?: React.ReactNode;
  /**
   * 下方buttn的text 和 onclick 包装对象
   */
  cta?: {
    text: string;
    onClick: React.MouseEventHandler<HTMLElement>;
  };
  /**
   * Size have two types
   */
  size?: 'normal' | 'small';
}
