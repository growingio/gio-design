import React, { ElementType } from 'react';

interface ComponentProps {
  className?: string;
  style?: React.CSSProperties;
}

export interface GridProps<C extends ElementType = ElementType> extends ComponentProps {
  /**
   `className`前缀
   */
  prefixCls?: string;
  /**
   根元素的组件
   */
  component?: C;

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
   宽度，1 个单位=8px
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
