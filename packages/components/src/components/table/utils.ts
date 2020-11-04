import { clone, has, get, join, set } from 'lodash';
import { ColumnsType, InnerColumnsType } from './interface';

export const translateInnerColumns = <RecordType>(columns: ColumnsType<RecordType>): InnerColumnsType<RecordType> =>
  clone(columns).map((cloneColumn) => {
    if (!has(cloneColumn, 'key')) {
      if (has(cloneColumn, 'dataIndex')) {
        if (Array.isArray(get(cloneColumn, 'dataIndex'))) {
          cloneColumn.key = join(get(cloneColumn, 'dataIndex'), '-');
        } else {
          cloneColumn.key = get(cloneColumn, 'dataIndex');
        }
      } else {
        console.warn('gio-design table: column key or dataIndex must have one');
      }
    }
    if (has(cloneColumn, 'children')) {
      set(cloneColumn, 'children', translateInnerColumns(get(cloneColumn, 'children')));
    }
    return cloneColumn;
  }) as InnerColumnsType<RecordType>;
