import classNames from 'classnames';
import React from 'react';
import { usePrefixCls } from '@gio-design/utils';
import { PREFIX } from '../constants';

interface ContentProps {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  label?: React.ReactNode;
}
/**
 * content render prefix、content、suffix
 * @param props
 * @returns
 */
const Content: React.FC<ContentProps> = (props) => {
  const { prefix, suffix, label } = props;
  const prefixCls = `${usePrefixCls(PREFIX)}--item`;
  const title = typeof label === 'string' ? label : undefined;
  return (
    <>
      {prefix}
      <span className={classNames(`${prefixCls}--text`, `${prefixCls}--ellipsis`)} title={title}>
        {label}
      </span>
      {suffix}
    </>
  );
};

export default Content;
