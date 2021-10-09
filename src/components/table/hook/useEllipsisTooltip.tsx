import React, { useCallback } from 'react';
import { has, get, isNil, isUndefined } from 'lodash';
import useRefs from '../../../utils/hooks/useRefs';
import { ColumnsType, ColumnGroupType, ColumnType } from '../interface';
import ToolTip from '../../../tooltip';

const useEllipsisTooltip = <RecordType,>(): [
  (columns: ColumnsType<RecordType>) => (ColumnGroupType<RecordType> | ColumnType<RecordType>)[]
] => {
  const [setRef, getRef, cacheRefs] = useRefs<HTMLSpanElement>();

  const transformEllipsisTooltipPipeline = useCallback(
    (columns: ColumnsType<RecordType>) =>
      columns.map((column) => {
        if (has(column, 'ellipsis') && has(column, 'width')) {
          const originRender = column.render;
          // eslint-disable-next-line no-param-reassign
          column.render = (...args) => {
            const text = isUndefined(originRender) ? args[0] : originRender(...args);
            const index = args[2];
            const textNode = getRef(get(column, 'dataIndex') + index)?.current;
            const columnWidth = Number(get(column, 'width')) - 32;
            const shouldShowTooltip = !isNil(textNode) && textNode.getBoundingClientRect().width - columnWidth > 0;
            return (
              <ToolTip disabled={!shouldShowTooltip} title={text} placement="topLeft">
                <span ref={setRef(get(column, 'dataIndex') + index)}>{text}</span>
              </ToolTip>
            );
          };
        }
        return column;
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cacheRefs.current.size]
  );

  return [transformEllipsisTooltipPipeline];
};

export default useEllipsisTooltip;
