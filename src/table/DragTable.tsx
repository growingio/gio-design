import React, { useState, useMemo, Key } from 'react';
import { MoveOutlined } from '@gio-design/icons';
import classNames from 'classnames';
import { findIndex, isArray, isObject, omit } from 'lodash';
import { usePrefixCls } from '@gio-design/utils';
import { SortableElement, SortableContainer, SortableHandle } from 'react-sortable-hoc';
import { TableComponents } from '@gio-design/table/es/interface';
import { ForwardRefFn, TableProps } from './interface';
import Table from './Table';
import { TABLE_PREFIX_CLS } from './utils';

const DragHandle = SortableHandle(() => <MoveOutlined />);

type SortableProps = {
  index?: number;
  key?: Key;
  disabled?: boolean;
  prefixCls?: string;
} & Record<string, unknown>;

const Items = SortableElement((props: SortableProps) => {
  const { disabled, prefixCls, ...restProps } = props;

  const cellProp = omit(restProps, ['columnIndex', 'columnKey']);

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

const Container = SortableContainer((props: SortableProps) => <tr {...props} />);

function DragTable<RecordType = Record<string, unknown>>(
  props: TableProps<RecordType>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const { columns, ...restProps } = props;
  const prefixCls = usePrefixCls(TABLE_PREFIX_CLS);

  const [newColumns, setNewColumns] = useState(columns);

  const columnKeys = useMemo(() => newColumns.map((column) => column.key), [newColumns]);

  const fixedColumnsKeys = useMemo(() => columns.map((column) => column.fixed && column.key), [columns]);

  const tableComponent: TableComponents<RecordType> = useMemo(() => {
    const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
      if (oldIndex !== newIndex) {
        const nextColumns = [...newColumns];
        const dragColumn = nextColumns.slice(oldIndex, oldIndex + 1);
        nextColumns.splice(oldIndex, 1);
        nextColumns.splice(newIndex, 0, dragColumn[0]);
        setNewColumns(nextColumns);
      }
    };

    const renderContainer = (containerProps: unknown) => (
      <Container
        helperClass={`${prefixCls}-drag-helper`}
        onSortEnd={onSortEnd}
        useDragHandle
        axis="x"
        hideSortableGhost={false}
        {...containerProps}
      />
    );

    const renderItem = (itemProps: unknown) => {
      if (isObject(itemProps)) {
        const columnKey = String((itemProps as Record<string, unknown>).columnKey);
        const notDrag =
          columnKey === 'RC_TABLE_KEY' ||
          columnKey === 'selection' ||
          (isArray(fixedColumnsKeys) && fixedColumnsKeys.includes(columnKey));

        const cellIndex = findIndex(columnKeys, (item) => item === columnKey);

        return notDrag ? (
          <th {...omit(itemProps, ['columnIndex', 'columnKey'])} />
        ) : (
          <Items prefixCls={prefixCls} index={cellIndex} key={columnKey} disabled={notDrag} {...itemProps} />
        );
      }
      return <th {...itemProps} />;
    };
    return {
      header: {
        row: renderContainer,
        cell: renderItem,
      },
    };
  }, [columnKeys, fixedColumnsKeys, newColumns, prefixCls]);

  return <Table<RecordType> components={tableComponent} columns={newColumns} ref={ref} {...restProps} />;
}

export default React.forwardRef(DragTable) as ForwardRefFn;
