import React from 'react';
import { usePrefixCls } from '@gio-design/utils';
import classnames from 'classnames';
import InnerLinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';
import type { TextProps } from './interfaces';

export { TextProps };
const LinesEllipsis = responsiveHOC()(InnerLinesEllipsis);

function Text({
  children = '',
  className,
  color = 'inherit',
  lines = 1,
  size: customizeSize,
  trimRight = true,
  style,
  ...rest
}: TextProps) {
  const prefixCls = usePrefixCls('text');
  const mergedSize = customizeSize;
  const cls = classnames(
    prefixCls,
    {
      [`${prefixCls}--${mergedSize}`]: true,
    },
    className
  );

  return (
    <LinesEllipsis
      data-testid="typography"
      className={cls}
      style={{ '--color': color, ...style } as React.CSSProperties}
      maxLine={lines}
      text={children}
      trimRight={trimRight}
      title={children}
      ellipsis="..."
      {...rest}
    />
  );
}

export default Text;
