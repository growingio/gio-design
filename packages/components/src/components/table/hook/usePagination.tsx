import React, { useMemo, useState, useEffect } from 'react';
import Pagination, { PaginationProps } from '../../pagination';

const usePagination = <RecordType,>(
  data: RecordType[],
  pagination: PaginationProps | false
): [RecordType[], JSX.Element | null] => {
  const { current = 1, pageSize = 10, ...rest } = pagination || {};
  const [localCurrent, setLocalCurrent] = useState<number>(current);
  const [localPageSize] = useState<number>(pageSize);
  useEffect(() => {
    setLocalCurrent(1);
  }, [data.length]);

  const paginationData = useMemo(() => data.slice((localCurrent - 1) * localPageSize, localCurrent * localPageSize), [
    data,
    localCurrent,
    localPageSize,
  ]);

  const PaginationComponent = (
    <Pagination
      className="gio-table-pagination"
      total={data.length}
      current={localCurrent}
      pageSize={localPageSize}
      onChange={(c) => setLocalCurrent(c)}
      {...rest}
    />
  );
  if (pagination === false) {
    return [data, null];
  }
  return [paginationData, PaginationComponent];
};

export default usePagination;
