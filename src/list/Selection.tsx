import classNames from 'classnames';
import React from 'react';
import usePrefixCls from '../utils/hooks/use-prefix-cls';
import { PREFIX } from './constants';
import { SelectionProps } from './interfance';

const Selection: React.FC<SelectionProps> = (props) => {
  const { className, style, value, onChange, children } = props;
  const prefixCls = `${usePrefixCls(PREFIX)}--selection`;
  return (
    <div className={classNames(prefixCls, className)} style={style}>
      {React.cloneElement(children as React.ReactElement, {
        value,
        onChange,
      })}
    </div>
  );
};

export default Selection;
