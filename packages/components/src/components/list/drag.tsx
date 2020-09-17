import React, { useState } from 'react';
import Sortable from './Sortable';
import { unionBy, noop } from 'lodash';
import SelectedItem from './Sortable/template';
import './style/sort.less';

const DragableList = ({
  dataSource,
  handleSort,
  prefixCls = 'gio-list',
  wrapStyle,
  width,
  height,
  onSelect = noop,
  onRemove = noop,
  selected,
}: any) => {
  const [data, setData] = useState(dataSource);

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
