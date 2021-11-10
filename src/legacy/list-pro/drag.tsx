import React, { useState, useEffect } from 'react';
import { unionBy, noop } from 'lodash';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import Sortable from './Sortable';
import SelectedItem from './Sortable/template';
import './style/sort.less';

const DragableList = ({
  dataSource,
  handleSort,
  prefixCls: customPrefixCls,
  wrapStyle,
  width,
  height,
  onSelect = noop,
  onRemove = noop,
  selected,
}: any) => {
  const prefixCls = usePrefixCls('list', customPrefixCls);
  const [data, setData] = useState(dataSource);

  useEffect(() => {
    setData(dataSource);
  }, [dataSource])

  const innerHandleSort = (steps: any) => {
    const combineDashbord = unionBy(steps, dataSource, 'value');
    if (handleSort) {
      handleSort(combineDashbord);
    }
    setData(combineDashbord);
  };

  return (
    <div className={`${prefixCls}-wrapper`} style={{ ...wrapStyle, width, height }}>
      <Sortable
        collection={data}
        onSorted={innerHandleSort}
        template={<SelectedItem selected={selected} onSelect={onSelect} onRemove={onRemove} collapsed={false} />}
      />
    </div>
  );
};

export default DragableList;
