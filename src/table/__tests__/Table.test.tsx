import { fireEvent, render, screen } from "@testing-library/react"
import React from "react"
import { Table } from ".."
import { sleep } from "../../utils/test";

describe('Testing Table', () => {
  it('render correctly', () => {
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
    const { container } = render(<Table columns={columns} title="users" />);
    expect(screen.queryByTestId('table')).toBeTruthy();
    expect(container.querySelector('thead')).toBeTruthy();
    expect(container.querySelector('.gio-table-wrapper')).toBeTruthy();
    expect(container.querySelector('.gio-table-title')).toHaveTextContent('users');
    expect(container.querySelector('.gio-table-wrapper')).toHaveStyle('--table-cell-padding: 12px 16px')
  });

  it(' render table with data rows', () => {
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
    const data = [{ key: 1, name: 'John', }, { key: 2, name: 'Jim' }]
    const { container } = render(<Table columns={columns} dataSource={data} pagination={false} />);
    expect(container.querySelectorAll('tbody tr').length).toBe(2);
  });
  it('render loading', () => {
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
    const data = [{ key: 1, name: 'John', }, { key: 2, name: 'Jim' }]
    const { container } = render(<Table loading columns={columns} dataSource={data} pagination={false} />);
    // screen.debug()
    expect(container.querySelector('.gio-loading')).toBeTruthy();
  })

  it('custom empty', () => {
    const { container } = render(<Table columns={[{
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
    },]} dataSource={[]} empty={{ type: "empty-result", description: "无结果" }} />);
    expect(screen.queryByText('无结果')).toBeTruthy();
    expect(container.querySelector('.gio-result-empty-result')).toBeTruthy();
  })
  it('render title and footer', () => {
    const dataSource = [{ key: 1, name: 'John', }, { key: 2, name: 'Jim' }]
    const { container } = render(<Table columns={[{
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
    },]} pagination={false} dataSource={dataSource} title={() => <h2 className="my-table-title">名单</h2>} footer={(data) => `total:${data.length}`} />);
    // screen.debug()
    expect(container.querySelector('.gio-table-footer')).toHaveTextContent('total:2');
    expect(container.querySelector('.my-table-title')).toHaveTextContent('名单')
  });
  it('test table pagination', () => {
    const genDataSource = (length = 5) =>
      Array.from({ length }).map(
        (_, index) =>
        ({
          id: `${index + 1 * 1000}`,
          name: `Name ${index + 1}`,
          address: `北京市朝阳公园`,
        })
      );
    const dataSource = genDataSource(1000)
    const { container } = render(<Table columns={[{
      title: 'Id',
      key: 'id',
      dataIndex: 'id',
    }, {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
    }, {
      title: 'Address',
      key: 'address',
      dataIndex: 'address',
    }]} dataSource={dataSource} pagination={{ current: 1, pageSize: 20 }} rowKey="id" />);
    expect(container.querySelector('.gio-table-pagination')).toBeTruthy();
    expect(container.querySelectorAll('.gio-table-row').length).toBe(20);
  });
  it('should display tooltip when when hover a column title that "info" props be setted', async () => {
    const { container } = render(<Table columns={[{
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
      info: 'some description'
    }]} />);
    expect(container.querySelector('.gio-table-column-title-info')).toBeTruthy();
    expect(container.querySelector('span[aria-label="question-outlined"]')).toBeTruthy();
    fireEvent.mouseEnter(container.querySelector('span[aria-label="question-outlined"]'));
    await sleep(100)
    expect(screen.queryByText('some description')).toBeTruthy();
  })
  it('should render without crash when dataSource is array with none-object items', () => {
    const { container } = render(
      <Table
        columns={[
          {
            title: 'name',
          },
        ]}
        pagination={false}
        dataSource={['1', 2, undefined, {}, null, true, false, 0]}
      />
    );
    expect(container.querySelector('.gio-table-tbody')).toBeTruthy()
  });
  it('render row index', () => {
    const columns = [
      {
        title: 'Name',
        key: 'name',
        dataIndex: 'name',
      },
    ];
    const data = [{ id: 1, name: 'John', }, { id: 2, name: 'Jim' }]
    const { container } = render(<Table rowKey="id" showIndex columns={columns} dataSource={data} pagination={false} />);
    expect(Array.from(container.querySelectorAll('.gio-table-tbody td:first-child')).map(e => e.textContent)).toStrictEqual(["1", "2"]);
  })
})