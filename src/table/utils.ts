import { isNil, isArray } from 'lodash';
import { ColumnType, Key } from './interface';

export const TABLE_PREFIX_CLS = 'table';

export const getColumnKey = <RecordType>(column: ColumnType<RecordType>, defaultKey: string): Key => {
  const { key, dataIndex } = column;
  if (!isNil(key)) return key;
  if (!isNil(dataIndex)) {
    return (isArray(dataIndex) ? dataIndex.join('-') : dataIndex) as Key;
  }

  return defaultKey;
};

export const getColumnPos = (index: number, pos?: string) => (pos ? `${pos}-${index}` : `${index}`);
