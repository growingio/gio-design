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

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 是否宽度平铺(没有 padding)
   * @default false
   */
  fullWidthContent?: boolean;
  /**
   * 不可选
   * @default false
   */
  disabled?: boolean;
  /**
   * 卡片内容
   */
  children?: React.ReactNode;
  /**
   * 卡片是否可点击
   * @default true
   */
  clickable?: boolean;
  /**
   * 自定义className前缀
   */
  prefixCls?: string;
  /**
   * 是否显示阴影 ( box-shadow: 0px 3px 8px rgba(36, 46, 89, 0.05); )
   * @default false
   */
  boxShadow?: boolean;
}
