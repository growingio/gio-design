import React, { useCallback } from 'react';
import useRefs from '../../../utils/hooks/useRefs';
import { ColumnsType } from '../interface';
import { has, get, isNil } from 'lodash';
import ToolTip from '../../tooltip';

const useEllipsisTooltip = <RecordType,>() => {
  const [setRef, getRef, cacheRefs] = useRefs<HTMLSpanElement>();

  const transformEllipsisTooltipPipeline = useCallback(
    (columns: ColumnsType<RecordType>) =>
      columns.map((column) => {
        if (!has(column, 'children') && has(column, 'ellipsis') && has(column, 'width')) {
          column.render = function () {
            const text = arguments[0];
            const index = arguments[2];
            const textNode = getRef(get(column, 'dataIndex') + index)?.current;
            const columnWidth = Number(get(column, 'width')) - 32;
            const shouldShowTooltip = !isNil(textNode) && textNode.getBoundingClientRect().width - columnWidth > 0;
            if (shouldShowTooltip) {
              return (
                <ToolTip title={text} placement="topLeft">
                  <span ref={setRef(get(column, 'dataIndex') + index)}>{text}</span>
                </ToolTip>
              );
            }
            return <span ref={setRef(get(column, 'dataIndex') + index)}>{text}</span>;
          };
        }
        return column;
      }),
    [cacheRefs.current.size]
  );

  return [transformEllipsisTooltipPipeline];
};

export default useEllipsisTooltip;
