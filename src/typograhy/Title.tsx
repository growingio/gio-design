import * as React from 'react';
import { usePrefixCls } from '@gio-design/utils';
import classnames from 'classnames';
import type { TitleProps } from './interfaces';

const TITLE_ELE_LIST = [1, 2, 3, 4];

const Title: React.FC<TitleProps> = ({ className, level = 1, ...restProps }: TitleProps) => {
  let componentName = 'h1';
  const prefixCls = usePrefixCls('title');
  const cls = classnames(
    prefixCls,
    {
      [`${prefixCls}--h${level}`]: true,
    },
    className
  );

  if (TITLE_ELE_LIST.indexOf(level) !== -1) {
    componentName = `h${level}`;
  }

  const Component = componentName as keyof JSX.IntrinsicElements;
  return <Component className={cls} {...restProps} />;
};

export default Title;
