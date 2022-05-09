import React from 'react';
import { DefaultSizeType } from '../utils/interfaces';

export type ExceptionStatusType = '403' | '404' | '500' | '410' | '423';
export type EmptyStatusType = 'empty' | 'empty-content' | 'empty-data' | 'empty-result';
export type ResultStatusType = ExceptionStatusType | EmptyStatusType;
export interface ResultProps {
  /**
   * 预制类型，使用组件自带的图片和描述
   */
  type?: ResultStatusType,

  /**
   * 外层classname
   */
  className?: string;
  /**
   * 外层容器style
   */
  style?: React.CSSProperties;
  /**
   * 自定义页面图片部分
   */
  image?: React.ReactNode;
  /**
   * 页面标题
   */
  title?: React.ReactNode;
  /**
   * 描述内容
   */
  description?: React.ReactNode;
  /**
   * 其他内容，位于title和description 下方的区域
   */
  extra?: React.ReactNode;
  /**
   * 下方buttn的text 和 onclick 包装对象,如需自定义操作区域内容 请使用extra
   * @deprecated use extra property
   */
  cta?: {
    text: string;
    onClick: React.MouseEventHandler<HTMLElement>;
  };
  /**
   * Size have two types
   */
  size?: DefaultSizeType;

  /**
   * 页面子组件，位于extra 下方的显示区域
   */
  children?: React.ReactNode;
}
