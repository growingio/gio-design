import * as React from 'react';
import { Table as AntdTable } from 'antd';
import { TableProps } from 'antd/lib/table';

const Table = (props: TableProps<any>) => <AntdTable {...props} />;
export default Table;
