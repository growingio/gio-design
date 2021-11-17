import React, { useEffect, useState } from 'react';
import { PlusCircleFilled } from '@gio-design/icons';
import Expression from './Expression';
import './index.less';
import { FilterValueType } from '../../interfaces';
import { defaultFilterItem } from '../../filterMap';
import Footer from '../Footer';
import Button from '../../../../button'; // new

interface FilterListProps {
  list: FilterValueType[];
  dimensionValueRequest?: (data: any) => Promise<any>;
  timeRange: string;
  measurements: any[];
  propertyOptions: any[];
  onCancel: () => void;
  onSubmit: (v: FilterValueType[]) => void;
  recentlyStorePrefix: string;
}
function FilterList(props: FilterListProps) {
  const {
    list = [],
    dimensionValueRequest,
    timeRange,
    measurements,
    propertyOptions,
    onCancel,
    onSubmit,
    recentlyStorePrefix,
  } = props;
  const [filterList, setFilterList] = useState<FilterValueType[]>([...list]);

  useEffect(() => {
    if (!list.length) {
      setFilterList([defaultFilterItem]);
    } else {
      setFilterList(list);
    }
  }, [list, list.length]);

  const expressChange = (v: FilterValueType, index: number) => {
    const subFilter = [...filterList];
    subFilter.splice(index, 1, v);
    setFilterList([...subFilter]);
  };

  const addFilter = () => {
    setFilterList([...filterList, defaultFilterItem]);
  };
  const deleteFilterItem = (index: number) => {
    if (filterList.length > 1) {
      filterList.splice(index, 1);
      setFilterList([...filterList]);
    } else {
      setFilterList([defaultFilterItem]);
    }
  };

  const submit = () => {
    onSubmit([...filterList]);
  };

  const cancel = () => {
    onCancel();
  };

  return (
    <>
      <div className="filter-list-box">
        {filterList.map((ele: FilterValueType, index: number) => (
          <Expression
            key={ele.key}
            index={index}
            exprs={filterList}
            filterItem={ele}
            deleteFilterItem={deleteFilterItem}
            dimensionValueRequest={dimensionValueRequest}
            timeRange={timeRange}
            measurements={measurements}
            onChange={expressChange}
            propertyOptions={propertyOptions}
            recentlyStorePrefix={recentlyStorePrefix}
          />
        ))}
      </div>
      <Button
        prefix={<PlusCircleFilled />}
        type="text"
        disabled={filterList.length >= 5 || filterList.some((ele: FilterValueType) => !ele.values.length)}
        onClick={addFilter}
      >
        添加过滤条件
      </Button>
      <Footer
        onCancel={cancel}
        onSubmit={submit}
        comfirmStatus={filterList.some((ele: FilterValueType) => !ele.values.length)}
      />
    </>
  );
}
export default FilterList;
