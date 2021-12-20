import React from 'react';

export interface CardMetaProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * 图片url或react
   */
  image?: React.ReactElement | string;
  /**
   * meta标题
   */
  title?: React.ReactNode;
  /**
   * meta副标题
   */
  description?: React.ReactNode;
  /**
   * meta内容
   */
  children?: React.ReactNode;
  /**
   * 右侧触发器
   */
  action?: React.ReactNode;
}

export interface CardProps {
  /**
   * 是否宽度平铺
   */
  fullWidthContent?: boolean;
  /**
   * 不可选
   */
  disabled?: boolean;
  /**
   * 卡片内容
   */
  children?: React.ReactNode;
  /**
   * 卡片是否可点击
   */
  clickable?: boolean;
  /**
   * 自定义className前缀
   */
  prefixCls?: string;
  /**
   * 自定义className
   */
  className?: string;
}
