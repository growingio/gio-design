import { fireEvent, render } from "@testing-library/react";
import React from "react";
import Table from "..";

describe('test Tree Table ', () => {
  const columns = [
    {
      title: 'Id',
      key: 'id',
      dataIndex: 'id',
    },
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
    },
  ];
  const data = [
    {
      id: '1',
      name: 'Jerry',
      age: 30,
      address: 'address',
      children: [
        {
          id: 'child-id-1',
          age: 13,
          address: 'child address',
          name: 'child name',
        },
      ],
    },
    {
      id: '2',
      name: 'Tom',
      age: 28,
      address: 'address',
      children: [
        {
          id: 'child-id-2',
          age: 13,
          address: 'child address',
          name: 'child name',
        },
      ],
    }
  ]
  it('tree data', () => {

    const { container } = render(<Table rowKey="id" pagination={false} columns={columns} dataSource={data} />);

    expect(container.querySelector('.gio-table-tbody td:nth-child(1) span[aria-label="arrow-right-outlined"]')).toBeTruthy();
  })
  it('render custom expand icon', () => {
    const { container } = render(<Table rowKey="id" expandable={{ expandIcon: () => <div className="expand-icon" />, }} pagination={false} columns={columns} dataSource={data} />);

    expect(container.querySelector('.gio-table-tbody .expand-icon')).toBeTruthy()
  });
  it('click expand button', () => {
    const handleExpand = jest.fn();
    const { container } = render(<Table rowKey="id" expandable={{ onExpand: handleExpand }} pagination={false} columns={columns} dataSource={data} />);
    expect(container.querySelector('.gio-table-tbody tr+tr')).toHaveAttribute('data-row-key', '2')
    fireEvent.click(container.querySelector('.gio-table-tbody td:nth-child(1) span[aria-label="arrow-right-outlined"]'));
    expect(container.querySelector('.gio-table-tbody tr+tr')).toHaveAttribute('data-row-key', 'child-id-1');
    expect(handleExpand).toHaveBeenCalled();
    expect(handleExpand.mock.calls[0][0]).toStrictEqual(true)
  })

})