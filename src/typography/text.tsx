import React from 'react';
import { usePrefixCls } from '@gio-design/utils';
import classnames from 'classnames';
import InnerLinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';
import type { TextProps } from './interfaces';
import Tooltip from '../tooltip';

export { TextProps };
const LinesEllipsis = responsiveHOC()(InnerLinesEllipsis);

function Text({
  children,
  className,
  color = 'inherit',
  lines = 1,
  size: customizeSize,
  tooltip,
  trimRight = true,
  style,
}: TextProps) {
  const prefixCls = usePrefixCls('text');
  const ref = React.useRef<{ isClamped: () => boolean }>(null);
  const [clamped, setClamped] = React.useState(false);

  const mergedSize = customizeSize;
  const cls = classnames(
    prefixCls,
    {
      [`${prefixCls}--${mergedSize}`]: true,
    },
    className
  );

  React.useEffect(() => {
    setClamped(ref.current ? ref.current.isClamped() : false);
  }, []);

  const linesNode = (
    <LinesEllipsis
      innerRef={ref}
      className={cls}
      style={{ '--color': color, ...style }}
      maxLine={lines}
      text={children}
      trimRight={trimRight}
      ellipsis="..."
    />
  );

  if (clamped) {
    return (
      <Tooltip {...tooltip} overlay={children}>
        {linesNode}
      </Tooltip>
    );
  }

  return linesNode;
}

export default Text;
