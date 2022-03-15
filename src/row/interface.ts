import { ElementType } from 'react';

export interface RowContextState {
  gutters: [number, number];
}

export interface RowProps {
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

export default RowProps;
