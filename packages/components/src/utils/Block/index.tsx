import * as React from 'react';
import cn from 'classnames';
import { noop } from 'lodash';

interface ClassDictionary {
  [id: string]: boolean | undefined | null;
}

type ClassValue = string | number | ClassDictionary | ClassArray | undefined | null | false;

type ClassArray = Array<ClassValue>;

interface BlockProps {
  top?: number;
  bottom?: number;
  right?: number;
  left?: number;
  height?: number;
  width?: number;
  onClick?: () => void;
  className?: string;
  classNames?: ClassArray;
}

const Block: React.FC<BlockProps> = ({
  top = 0,
  bottom = 0,
  right = 0,
  left = 0,
  height,
  width,
  onClick = noop,
  children,
  className,
  classNames = [],
}) => (
  <div
    style={{
      paddingBottom: bottom,
      paddingLeft: left,
      paddingRight: right,
      paddingTop: top,
      height,
      width,
    }}
    onClick={onClick}
    className={cn(className, ...classNames)}
  >
    {children}
  </div>
);

export default Block;
