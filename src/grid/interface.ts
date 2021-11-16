import React, { ElementType } from 'react';

interface ComponentProps {
  /**
   `className`前缀
  */
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  /**
   根元素的组件
   */
  component?: ElementType;
}

export interface GridProps extends ComponentProps {
  /**
   `className`前缀
   */
  prefixCls?: string;

  // flexbox types
  /**
   `flex-direction`映射
   */
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  /**
   `justify-content`映射
   */
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  /**
   `align-items`映射
   */
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  /**
   `align-content`映射
   */
  alignContent?: 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around';
  /**
   `flex-wrap`映射
   */
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  /**
   子元素的间距，可能为 `css-grid gap` 的映射
   */
  gap?: number | string;

  /**
   所占的栅格数
   */
  span?: number;
  /**
   是否设置为容器元素，宽度为 100%
   */
  container?: boolean;
  /**
   合并 gap
   */
  collapse?: boolean;
}

export interface RowContextState {
  gutters: [number, number];
}

export interface RowProps extends ComponentProps {
  // flexbox types
  /**
   `flex-direction`映射
   */
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  /**
   `justify-content`映射
   */
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  /**
   `align-items`映射
   */
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  /**
   `align-content`映射
   */
  alignContent?: 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around';
  /**
   `flex-wrap`映射
   */
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  /**
   子元素的间距，可能为 `css-grid gap` 的映射
   */
  gutter?: number | [number, number];
}

export interface ColProps extends ComponentProps {
  /**
   `flex order` 映射
  */
  order?: number;
  /**
   所占的栅格数
   */
  span?: number;
  /*
    栅格左侧的间隔格数，间隔内不可以有栅格
  */
  offset?: number;
}
