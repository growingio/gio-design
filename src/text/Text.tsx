import React, { useState, useRef, useEffect } from 'react';
import classnames from 'classnames';
import Truncate from 'react-truncate';
import { TextProps } from './interface';
import Tooltip from '../tooltip';
import usePrefixCls from '../utils/hooks/use-prefix-cls';
import './style';

const Text: React.FC<TextProps> = (props: TextProps) => {
  const [truncated, setTruncted] = useState(false);
  const {
    className,
    style,
    lines = 1,
    width = 0,
    ellipsis = '...',
    children,
    trimwhitespace,
    placement = 'top',
  } = props;

  const containerRef = useRef<any>(null);
  const contentRef = useRef<any>(null);
  const prefixCls = usePrefixCls('text');
  const cls = classnames(prefixCls, className);

  const [currentWidth, setCurrentWidth] = useState(width);

  const handleTruncate = (isTruncated: boolean) => {
    setCurrentWidth((containerRef.current?.children[0].offsetWidth ?? 0) * lines);
    if (isTruncated !== truncated) {
      setTruncted(isTruncated);
      isTruncated && contentRef.current.onResize();
    }
  };

  useEffect(() => {
    setCurrentWidth(containerRef.current.children[0].offsetWidth * lines);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tooltip placement={placement} title={children} disabled={!truncated}>
      <div ref={containerRef} className={cls} style={style}>
        <Truncate
          lines={lines}
          width={lines > 1 ? currentWidth : width}
          ellipsis={ellipsis}
          trimWhitespace={trimwhitespace}
          onTruncate={handleTruncate}
          ref={contentRef}
        >
          {children}
        </Truncate>
      </div>
    </Tooltip>
  );
};

export default Text;
