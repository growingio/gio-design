import React from 'react';
import { IBaseListProps } from './interface';
import './style/base.less';
import Core from './core';

const onChange_ = (...args: any) => {
  console.log(args);
};

const NormalList = ({
  prefixCls = 'gio-list',
  wrapStyle,
  dataSource,
  width,
  isMultiple,
  onChange = onChange_,
  value,
  height,
  labelRenderer,
  rowHeight,
}: IBaseListProps) => (
  <div className={`${prefixCls}-wrapper`} style={{ ...wrapStyle, width }}>
    <Core
      value={value}
      options={dataSource}
      onChange={onChange}
      isMultiple={isMultiple}
      height={height}
      width={width}
      labelRenderer={labelRenderer}
      rowHeight={rowHeight}
    />
  </div>
);

export default NormalList;
