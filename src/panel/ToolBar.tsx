import React from 'react';
import classNames from 'classnames';
import { usePrefixCls } from '@gio-design/utils';
import { ToolBarProps } from './interfaces';

const ToolBar: React.FC<ToolBarProps> = (props) => {
  const { children, className, style = {}, float = 'left' } = props;
  const prefix = usePrefixCls('panel__tool-bar');

  return (
    <div className={classNames(prefix, className)} style={Object.assign(style, { float })}>
      {children}
    </div>
  );
};

export default ToolBar;
