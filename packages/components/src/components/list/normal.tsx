import React from 'react';
import { noop } from 'lodash';
import { IBaseListProps } from './interface';
import './style/base.less';
import Core from './core';

const NormalList = ({
  prefixCls = 'gio-list',
  wrapStyle,
  dataSource,
  width,
  onChange = noop,
  ...restProps
}: IBaseListProps) => (
  <div className={`${prefixCls}-wrapper`} style={{ ...wrapStyle, width }}>
    <Core options={dataSource} onChange={onChange} width={width} {...restProps} />
  </div>
);

export default NormalList;
