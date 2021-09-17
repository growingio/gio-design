/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useMemo } from 'react';
import { MoveOutlined } from '@gio-design/icons';
import classNames from 'classnames';
import { findIndex, omit } from 'lodash';
import { usePrefixCls } from '@gio-design/utils';
import { SortableElement, SortableContainer, SortableHandle } from 'react-sortable-hoc';
import { TableComponents } from '@gio-design/table/es/interface';
import { ColumnType, TableProps } from './interface';
import Table from './Table';
import './style/index';

const DragHandle = SortableHandle(() => <MoveOutlined />);

const Items = SortableElement((props: any) => {
  const prefixCls = usePrefixCls('table');
  const disabled = props.columnKey === 'RC_TABLE_KEY' || props.columnKey === 'selection';

  const cellProp = omit(props, ['columnIndex', 'columnKey']);

  return (
    <th {...cellProp}>
      <span className={`${prefixCls}-drag-container`}>
        <span className={classNames(`${prefixCls}-drag-handle`, { [`${prefixCls}-drag-handle-disabled`]: disabled })}>
          <DragHandle />
        </span>
        <span {...cellProp} />
      </span>
    </th>
  );
});

const Container = SortableContainer((props: any) => <tr {...props} />);

const DragTable = ({ columns = [], ...restProps }: TableProps<any>) => {
  const prefixCls = usePrefixCls('table');

  const [newColumns, setNewColumns] = useState(columns);

  const columnKeys = useMemo(() => newColumns.map((column: ColumnType<any>) => column.key), [newColumns]);

  const fixedColumnsKeys = useMemo(
    () => columns.map((column: ColumnType<any>) => column.fixed && column.key),
    [columns]
  );

  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    if (oldIndex !== newIndex) {
      const nextColumns = [...newColumns];
      const dragColumn = nextColumns.slice(oldIndex, oldIndex + 1);
      nextColumns.splice(oldIndex, 1);
      nextColumns.splice(newIndex, 0, dragColumn[0]);
      setNewColumns(nextColumns);
    }
  };

  const renderContainer = (props: any) => (
    <Container
      helperClass={`${prefixCls}-drag-helper`}
      onSortEnd={onSortEnd}
      useDragHandle
      axis="x"
      hideSortableGhost={false}
      {...props}
    />
  );
  const renderItem = (props: any) => {
    const notDrag =
      props.columnKey === 'RC_TABLE_KEY' ||
      props.columnKey === 'selection' ||
      fixedColumnsKeys?.includes(props.columnKey);

    const cellIndex = findIndex(columnKeys, (item: string) => item === props.columnKey);

    return notDrag ? (
      <th {...omit(props, ['columnIndex', 'columnKey'])} />
    ) : (
      <Items index={cellIndex} key={props.columnKey} disabled={notDrag} {...props} />
    );
  };

  const tableComponent: TableComponents<any> = {
    header: {
      row: renderContainer,
      cell: renderItem,
    },
  };

  return <Table components={tableComponent} columns={newColumns} {...restProps} />;
};

export default DragTable;
