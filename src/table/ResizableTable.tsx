/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useRef } from 'react';
import { Resizable } from 'react-resizable';
import { TableProps } from './interface';
import Table from './index';
import './style';

const ResizableTitle = (props: any) => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          onClick={(e: any) => {
            e.stopPropagation();
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
      minConstraints={[58, 0]}
    >
      <th {...restProps} />
    </Resizable>
  );
};

// eslint-disable-next-line import/prefer-default-export
export const tableComponent = {
  header: {
    cell: ResizableTitle,
  },
};

const ResizableTable = (props: TableProps<any>) => {
  const { columns = [], dataSource, ...restProps } = props;

  const [column, setColumn] = useState(columns);
  const modelStatusRef = useRef<any>(null);

  const handleResize =
    (index: number) =>
    (e: any, { size }: any) => {
      const nextColumns = [...modelStatusRef.current];

      const prevWidth = nextColumns[index].width;
      const nextPrevWidth = nextColumns[index + 1].width;

      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width < prevWidth + nextPrevWidth - 58 ? size.width : prevWidth + nextPrevWidth - 58,
      };

      nextColumns[index + 1] = {
        ...nextColumns[index + 1],
        width: nextPrevWidth + (prevWidth - size.width) <= 58 ? 58 : nextPrevWidth + (prevWidth - size.width),
      };

      setColumn(nextColumns);
    };

  useEffect(() => {
    const newColumn = column.map((col: any, index: number) => ({
      ...col,
      onHeaderCell: (cols: any) => ({
        width: cols.width,
        onResize: handleResize(index),
      }),
    }));
    setColumn(newColumn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    modelStatusRef.current = column;
  }, [column]);

  return <Table components={tableComponent} dataSource={dataSource} columns={column} {...restProps} />;
};

export default ResizableTable;
