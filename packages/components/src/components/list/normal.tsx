import React from 'react';
import { noop } from 'lodash';
import { IBaseListProps } from './interface';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import './style/base.less';
import Core from './core';

const NormalList = ({
  prefixCls: customPrefixCls,
  wrapStyle,
  dataSource,
  width,
  onChange = noop,
  isMultiple = false,
  getPopupContainer,
  placement,
  ...restProps
}: IBaseListProps): React.ReactElement => {
  const prefixCls = usePrefixCls('list', customPrefixCls);
  return (
    <div className={`${prefixCls}-wrapper`} style={{ ...wrapStyle, width }}>
      <Core 
        options={dataSource} 
        onChange={onChange} 
        isMultiple={isMultiple} 
        getPopupContainer={getPopupContainer}
        placement={placement}
        {...restProps} 
      />
    </div>
  );
};

export default NormalList;
