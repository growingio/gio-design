import React, { useCallback, useEffect } from 'react';
import { has, get } from 'lodash';
import toArray from 'rc-util/lib/Children/toArray';
import useRefs from '../../../utils/hooks/useRefs';
import { ColumnsType, ColumnGroupType, ColumnType } from '../interface';
import Avatar from '../../avatar';

const useCustomRules = <RecordType,>(prefixCls: string): [
  (columns: ColumnsType<RecordType>) => (ColumnGroupType<RecordType> | ColumnType<RecordType>)[]
] => {
  const [setRef, getRef, cacheRefs] = useRefs<HTMLSpanElement>();

  const transformCustomRules = useCallback(
    (columns: ColumnsType<RecordType>) =>
      columns.map((column) => {
        if (has(column, 'render') && !has(column, 'children')) {
          const columnRender = column.render;
          // eslint-disable-next-line no-param-reassign
          column.render = (...args) => {
            const renderElement = columnRender(...args);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useEffect(() => {
              if(toArray(renderElement).some((node) => node.type === Avatar)){
                getRef(get(column, 'key') + args[2])?.current.parentElement.classList.add(`${prefixCls}-cell-have-avatar`);
              }
            // eslint-disable-next-line react-hooks/exhaustive-deps
            }, [])

            if(React.isValidElement(renderElement) && toArray(renderElement).some((node) => node.type === Avatar)){
              return React.cloneElement(renderElement, { ref: setRef(get(column, 'key') + args[2])});
            }
            return renderElement;
          };
        }
        return column;
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cacheRefs.current.size]
  );

  return [transformCustomRules];
};

export default useCustomRules;
