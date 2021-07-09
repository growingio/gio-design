import React, { useState, useRef, useEffect } from 'react';
import classnames from 'classnames';
import Truncate from 'react-truncate';
import { TextProps } from './interface';
import Tooltip from '../components/tooltip';
import usePrefixCls from '../utils/hooks/use-prefix-cls';
import './style';

const Text: React.FC<TextProps> = (props: TextProps) => {
  const [regWidth, setRegWidth] = useState<number>(0);
  const {
    className,
    style,
    lines = 1,
    width = 0,
    ellipsis = '...',
    children,
    trimwhitespace = false,
    placement = 'top',
  } = props;

  const contentRef = useRef<HTMLDivElement>(null);
  const prefixCls = usePrefixCls('text');
  const cls = classnames(prefixCls, className);

  useEffect(() => {
    setRegWidth(contentRef.current?.clientWidth as number);
  }, [lines, width]);

  return (
    <Tooltip placement={placement} title={children}>
      <div className={cls} style={style} ref={contentRef}>
        <Truncate
          lines={lines}
          width={(lines > 1) ? (regWidth * lines) : width}
          ellipsis={ellipsis}
          trimWhitespace={trimwhitespace}
        >
          {children}
        </Truncate>
      </div>
    </Tooltip>
  );
};

export default Text;
