import { fireEvent, render } from "@testing-library/react";
import React from 'react';
import Table from "..";

describe('ResizableTable', () => {
  const data = [
    { key: 1, name: 'Jack', age: 10, gender: 'male' },
    { key: 2, name: 'Tom', age: 15, gender: 'male' },
    { key: 3, name: 'Jerry', age: 16, gender: 'male' },
    { key: 4, name: 'Rose', age: 11, gender: 'female' }
  ];
  // Simulate a movement; can't use TestUtils/fireEvent here because it uses react's event system only,
  // but <DraggableCore> attaches event listeners directly to the document.
  // Would love to new MouseEvent() here but it doesn't work with PhantomJS / old browsers.
  // var e = new MouseEvent('mousemove', {clientX: 100, clientY: 100});
  function mouseMove(x: number, y: number, node: Element) {
    const doc = node ? node.ownerDocument : document;
    const evt = doc.createEvent('MouseEvents');
    evt.initMouseEvent('mousemove', true, true, window,
      0, 0, 0, x, y, false, false, false, false, 0, null);
    doc.dispatchEvent(evt);
    return evt;
  }
  function simulateMovementFromTo(node: Element, fromX: number, fromY: number, toX: number, toY: number) {

    fireEvent.mouseDown(node, { clientX: fromX, clientY: fromY });
    mouseMove(toX, toY, node);
    fireEvent.mouseUp(node);
  }
  it('render a table', () => {
    render(<Table.ResizableTable
      title="宽度可调整的列，必须给每个列设置固定宽度"
      columns={undefined}
      dataSource={data}
      rowKey="key"
      pagination={false}
    />)
  });

  it('render and drag to resize column width', async () => {
    const columns = [
      {
        dataIndex: 'key',
        title: 'Key',
        width: 200,
        onHeaderCell: () => ({ abbr: 'Key' })
      },
      {
        dataIndex: 'name',
        title: 'Name',
        width: 200,
      },

    ];
    const { container } = render(<Table.ResizableTable
      title="宽度可调整的列，必须给每个列设置固定宽度"
      columns={columns}
      dataSource={data}
      rowKey="key"
      pagination={false}
    />
    );

    expect(container.querySelector('.gio-table-thead th')).toHaveClass('react-resizable');
    expect(container.querySelector('colgroup col:first-child')).toHaveStyle({ width: '200px' })
    const handleEle = container.querySelector('.gio-table-thead th:nth-child(1) div.gio-table-resizable-handle');
    fireEvent.click(handleEle);
    handleEle.getBoundingClientRect = jest.fn().mockImplementation(() => ({
      left: 200,
      top: 0,
      x: 200,
    }));
    simulateMovementFromTo(handleEle, 200, 0, 50, 0);
    expect(container.querySelector('colgroup col:first-child')).toHaveStyle({ width: '58px' })


  })
  it('render and drag to resize column width 2', async () => {
    const columns = [
      {
        dataIndex: 'key',
        title: 'Key',
        width: 200,
        onHeaderCell: (): unknown => undefined
      },
      {
        dataIndex: 'name',
        title: 'Name',
        width: 100,
      },

    ];
    const { container } = render(<Table.ResizableTable
      title="宽度可调整的列，必须给每个列设置固定宽度"
      columns={columns}
      dataSource={data}
      rowKey="key"
      pagination={false}
    />
    );

    expect(container.querySelector('colgroup col:first-child')).toHaveStyle({ width: '200px' })
    const handleEle = container.querySelector('.gio-table-thead th:nth-child(1) div.gio-table-resizable-handle');
    fireEvent.click(handleEle);
    handleEle.getBoundingClientRect = jest.fn().mockImplementation(() => ({
      left: 200,
      top: 0,
      x: 200,
    }));
    simulateMovementFromTo(handleEle, 200, 0, 250, 0);
    expect(container.querySelector('colgroup col:first-child')).toHaveStyle({ width: '242px' })

  })
})