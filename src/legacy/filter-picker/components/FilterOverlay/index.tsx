import React from 'react';
import FilterList from '../FilterList';
import { FilterValueType } from '../../interfaces';
import './index.less';

interface FilterOverflyProps {
  onCancel: () => void;
  onSubmit: (v: FilterValueType[]) => void;
  filterList: FilterValueType[];
  propertyOptions: any[];
  dimensionValueRequest?: (data: any) => Promise<any>;
  timeRange: string;
  measurements: any[];
  recentlyStorePrefix: string;
}
function FilterOverlay(props: FilterOverflyProps) {
  const {
    onCancel,
    onSubmit,
    filterList,
    dimensionValueRequest,
    timeRange,
    measurements,
    propertyOptions,
    recentlyStorePrefix,
  } = props;
  return (
    <div className="filter-condition_box">
      <div className="filter-condition_title">选择过滤条件</div>
      <FilterList
        list={filterList}
        dimensionValueRequest={dimensionValueRequest}
        timeRange={timeRange}
        measurements={measurements}
        propertyOptions={propertyOptions}
        onCancel={onCancel}
        onSubmit={onSubmit}
        recentlyStorePrefix={recentlyStorePrefix}
      />
    </div>
  );
}

export default FilterOverlay;
