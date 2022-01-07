import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Resizable, ResizableProps } from 'react-resizable';
import { usePrefixCls } from '@gio-design/utils';
import { isFunction, omit } from 'lodash';
import { ColumnsType, ColumnType, ForwardRefFn, TableProps } from './interface';
import Table from './index';
import { TABLE_PREFIX_CLS } from './utils';

const ResizableTitle = (props: Pick<ResizableProps, 'onResize' | 'width'>) => {
  const { onResize, width, ...restProps } = props;

  const prefixCls = usePrefixCls(TABLE_PREFIX_CLS);

  const separatorNode = useMemo(
    () => (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
      <div
        className={`${prefixCls}-resizable-handle`}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
      />
    ),
    [prefixCls]
  );

  if (!width) {
    return <th {...omit(restProps, ['columnIndex', 'columnKey'])} />;
  }

  return (
    <Resizable width={width} height={0} handle={separatorNode} onResize={onResize} minConstraints={[58, 0]}>
      <th {...omit(restProps, ['columnIndex', 'columnKey'])} />
    </Resizable>
  );
};

function ResizableTable<RecordType = Record<string, unknown>>(
  props: TableProps<RecordType>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const { columns = [], dataSource, ...restProps } = props;

  const [columnsState, setColumnsState] = useState<ColumnsType<RecordType>>(columns);
  const previousColumnsRef = useRef<ColumnsType<RecordType>>(columns);

  useEffect(() => {
    const handleResize =
      (index: number): ResizableProps['onResize'] =>
      (_event, { size }) => {
        const nextColumns = [...previousColumnsRef.current];

        const prevWidth = Number.parseInt(`${nextColumns[index].width}`, 10);
        const nextPrevWidth = Number.parseInt(`${nextColumns[index + 1].width}`, 10);

        nextColumns[index] = {
          ...nextColumns[index],
          width: size.width < prevWidth + nextPrevWidth - 58 ? size.width : prevWidth + nextPrevWidth - 58,
        };

        nextColumns[index + 1] = {
          ...nextColumns[index + 1],
          width: nextPrevWidth + (prevWidth - size.width) <= 58 ? 58 : nextPrevWidth + (prevWidth - size.width),
        };

        setColumnsState(nextColumns);
      };

    const getOnHeaderCell = (column: ColumnType<RecordType> | undefined, index: number) => {
      if (isFunction(column?.onHeaderCell)) {
        const headerCell = column?.onHeaderCell(column) || {};
        return (cell: ColumnType<RecordType>) => ({
          ...headerCell,
          width: cell.width,
          onResize: handleResize(index),
        });
      }
      return (cell: ColumnType<RecordType>) => ({
        width: cell.width,
        onResize: handleResize(index),
      });
    };

    setColumnsState((oldColumnsState) =>
      oldColumnsState.map<ColumnType<RecordType>>((column, index) => ({
        ...column,
        onHeaderCell: getOnHeaderCell(column, index) as unknown as ColumnType<RecordType>['onHeaderCell'],
      }))
    );
  }, []);

  useEffect(() => {
    previousColumnsRef.current = columnsState;
  }, [columnsState]);

  const components = useMemo(
    () => ({
      header: {
        cell: ResizableTitle,
      },
    }),
    []
  );

  return (
    <Table<RecordType>
      components={components}
      dataSource={dataSource}
      columns={columnsState}
      ref={ref}
      {...restProps}
    />
  );
}

export default React.forwardRef(ResizableTable) as ForwardRefFn;
