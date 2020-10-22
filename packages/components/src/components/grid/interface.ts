import React, { ElementType } from 'react';

interface ComponentProps {
  className?: string;
  style?: React.CSSProperties;
}

export interface GridProps<C extends ElementType = ElementType> extends ComponentProps {
  prefixCls?: string;
  component?: C;

  // flexbox types
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  alignContent?: 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?: number | string;

  // grid property
  span?: number;
  container?: boolean;

  collapse?: boolean;
}
