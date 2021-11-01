import React from 'react';

interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  /**
   * 分割线的方向
   * @default `horizontal`
   */
  orientation?: 'horizontal' | 'vertical';

  /**
   * 是否处于 flex 容器中。设置为 true，则能正确计算分割线的高度，否则高度为零。
   * @default false
   */
  flexItem?: boolean;
}

export default DividerProps;
