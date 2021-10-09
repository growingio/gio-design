import React from 'react';
import { usePrefixCls, useSize } from '@gio-design/utils';
import classnames from 'classnames';
import InnerLinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';
import type { TextProps } from './interfaces';
import Tooltip from '../tooltip';

const LinesEllipsis = responsiveHOC()(InnerLinesEllipsis);

function Text({
  children,
  className,
  color = 'black',
  lines = 1,
  size: customizeSize,
  tooltip,
  trimRight = true,
}: TextProps) {
  const size = useSize();
  const prefixCls = usePrefixCls('text');
  const ref = React.useRef<{ isClamped: () => boolean }>(null);
  const [clamped, setClamped] = React.useState(false);

  const mergedSize = customizeSize ?? size;
  const cls = classnames(
    prefixCls,
    {
      [`${prefixCls}--${color}`]: true,
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
