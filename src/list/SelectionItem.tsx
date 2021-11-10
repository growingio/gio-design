import classNames from 'classnames';
import React from 'react';
import usePrefixCls from '../utils/hooks/use-prefix-cls';
import { PREFIX } from './constants';
import { SelectionItemProps } from './interfance';

const Selection: React.FC<SelectionItemProps> = (props) => {
  const { className, style, title, children } = props;
  const prefixCls = `${usePrefixCls(PREFIX)}--selection--item`;
  return (
    <div className={classNames(prefixCls, className)} style={style}>
      <div className={`${prefixCls}--title`}>{title}</div>
      {children}
    </div>
  );
};

export default Selection;
