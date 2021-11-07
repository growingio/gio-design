import { clone, has, get, join, set } from 'lodash';
import { ColumnsType } from './interface';

export const TABLE_PREFIX_CLS = 'table-new';

// eslint-disable-next-line import/prefer-default-export
export const translateInnerColumns = <RecordType>(columns: ColumnsType<RecordType>): ColumnsType<RecordType> =>
  clone(columns).map((cloneColumn) => {
    if (!has(cloneColumn, 'key')) {
      if (has(cloneColumn, 'dataIndex')) {
        if (Array.isArray(get(cloneColumn, 'dataIndex'))) {
          set(cloneColumn, 'key', join(get(cloneColumn, 'dataIndex'), '-'));
        } else {
          set(cloneColumn, 'key', get(cloneColumn, 'dataIndex'));
        }
      } else {
        // eslint-disable-next-line no-console
        console.warn('gio-design table: column key or dataIndex must have one');
      }
    }
    if (has(cloneColumn, 'children')) {
      set(cloneColumn, 'children', translateInnerColumns(get(cloneColumn, 'children')));
    }
    return cloneColumn;
  });
