import { fireEvent, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from 'react';
import Table from "..";

describe('ResizableTable', () => {
  const data = [
    { key: 1, name: 'Jack', age: 10, gender: 'male' },
    { key: 2, name: 'Tom', age: 15, gender: 'male' },
    { key: 3, name: 'Jerry', age: 16, gender: 'male' },
    { key: 4, name: 'Rose', age: 11, gender: 'female' }
  ];
  it('render', () => {
    const columns = [
      {
        dataIndex: 'key',
        title: 'Key',
        width: 200,
      },
      {
        dataIndex: 'name',
        title: 'Name',
        width: 200,
      },
      {
        dataIndex: 'age',
        title: 'Age',
        width: 200,
      },
      {
        dataIndex: 'address',
        title: 'Address',
        width: 500,
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
    // screen.debug();

    expect(container.querySelector('.gio-table-thead th')).toHaveClass('react-resizable');
    const handleEle = container.querySelector('.gio-table-thead th:nth-child(2) div.gio-table-resizable-handle');
    fireEvent.click(handleEle);

    fireEvent.mouseEnter(handleEle, { clientX: 200 });
    fireEvent.dragStart(handleEle);
    fireEvent.drag(handleEle);
    fireEvent.mouseMove(handleEle, { clientX: 50 });
    fireEvent.dragOver(handleEle);
    fireEvent.dragEnd(handleEle);
    const targetPos = container.querySelector('.gio-table-thead th:nth-child(1) div.gio-table-resizable-handle');
    userEvent.pointer([
      // touch the screen at element1
      { keys: '[TouchA>]', target: handleEle },
      // move the touch pointer to element2
      { pointerName: 'TouchA', target: targetPos },
      // release the touch pointer at the last position (element2)
      { keys: '[/TouchA]' },
    ])

  })
})