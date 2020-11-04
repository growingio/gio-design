import React, { useCallback } from 'react';
import { has, get, isNil } from 'lodash';
import useRefs from '../../../utils/hooks/useRefs';
import { ColumnsType } from '../interface';
import ToolTip from '../../tooltip';

const useEllipsisTooltip = <RecordType,>() => {
  const [setRef, getRef, cacheRefs] = useRefs<HTMLSpanElement>();

  const transformEllipsisTooltipPipeline = useCallback(
    (columns: ColumnsType<RecordType>) =>
      columns.map((column) => {
        if (has(column, 'ellipsis') && has(column, 'width') && !has(column, 'render')) {
          column.render = function () {
            const text = arguments[0];
            const index = arguments[2];
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
    [cacheRefs.current.size]
  );

  return [transformEllipsisTooltipPipeline];
};

export default useEllipsisTooltip;
