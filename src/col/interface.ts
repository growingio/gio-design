import { ElementType } from 'react';

export interface ColProps {
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

export default ColProps;
