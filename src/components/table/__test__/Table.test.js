import React from 'react';
import { mount } from 'enzyme';
import { render } from '@testing-library/react';
import { act } from 'react-test-renderer';
import Table from '../index';

const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    weight: 70,
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    weight: 60,
  },
  {
    key: '3',
    name: '航航',
    age: 18,
    weight: 70,
  },
  {
    key: '4',
    name: '屁屁',
    age: 22,
    weight: 60,
  },
];

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    info: '这里是用户的姓名',
    sorter: (a, b) => a.name.length - b.name.length,
    filters: ['名字俩字', '名字仨字'],
    onFilter: (value, record) => {
      if (value === '名字俩字') {
        return record.name.length === 2;
      }
      if (value === '名字仨字') {
        return record.name.length === 3;
      }
      return false;
    },
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    info: '这里是用户的年龄',
    sorter: (a, b) => a.age - b.age,
    filters: ['小孩子', '大人'],
    onFilter: (value, record) => {
      if (value === '小孩子') {
        return record.age <= 22;
      }
      if (value === '大人') {
        return record.age > 22;
      }
      return false;
    },
  },
  {
    title: '体重',
    dataIndex: 'weight',
    key: 'weight',
    sorter: (a, b) => a.weight - b.weight,
    info: '这里是用户的体重',
    sortPriorityOrder: 2,
    filters: [60, 70],
    onFilter: (value, record) => {
      if (value === 60) {
        return record.weight === 60;
      }
      if (value === 70) {
        return record.weight === 70;
      }
      return false;
    },
  },
];

describe('Testing Table', () => {
  const getTable = () => <Table title="列表标题" dataSource={dataSource} columns={columns} pagination={false} />;

  it('should be stable', () => {
    const { asFragment } = render(getTable());
    expect(asFragment()).toMatchSnapshot();
  });

  it('should be mount, setProps, unmount with no error', () => {
    expect(() => {
      const wrapper = mount(getTable());
      wrapper.setProps({ title: '列表标题设置' });
      wrapper.setProps({ pagination: true });
      wrapper.setProps({
        rowSelection: {
          onChange: (localSelectedRowKeys, selectRows) => {
            // eslint-disable-next-line no-console
            console.log(localSelectedRowKeys, selectRows);
          },
        },
      });
      wrapper.unmount();
    }).not.toThrow();
  });

  test('props prefixCls', () => {
    const wrapper = mount(getTable());
    wrapper.setProps({ prefixCls: 'custom-prefix' });
    expect(wrapper.exists('.custom-prefix-table')).toBe(true);
    expect(wrapper.exists('.gio-table')).toBe(false);
  });

  test('props className', () => {
    const wrapper = mount(getTable());
    wrapper.setProps({ className: 'custom-classname' });
    expect(wrapper.exists('.custom-classname')).toBe(true);
  });

  test('props title', () => {
    const wrapper = mount(getTable());
    expect(wrapper.exists('.gio-table-title')).toBe(true);
    expect(wrapper.find('.gio-table-title').at(0).text()).toBe('列表标题');
  });

  test('props pagination', () => {
    const onChange = jest.fn();
    const _dataSource = Array.from({ length: 100 }, (_, key) => ({ a: key, b: key, c: key, d: key }));
    const _columns = [
      {
        title: 'A',
        dataIndex: 'a',
        key: 'a',
        width: 200,
      },
      {
        title: 'B',
        dataIndex: 'b',
        key: 'b',
        width: 200,
      },
      {
        title: 'C',
        dataIndex: 'c',
        key: 'c',
        width: 200,
      },
      {
        title: 'D',
        dataIndex: 'd',
        key: 'd',
        width: 200,
      },
    ];
    const wrapper = mount(
      <Table title="列表标题" dataSource={_dataSource} columns={_columns} pagination onChange={onChange} />
    );
    expect(wrapper.exists('.gio-table-pagination')).toBe(true);
    wrapper.find('.gio-pagination-item').at(1).simulate('click');
    expect(onChange).toBeCalledWith({ current: 2, pageSize: 10 }, [], []);
  });

  it('should be render rightly', () => {
    const wrapper = mount(getTable());
    expect(wrapper.exists('.gio-table-title')).toBe(true);
    expect(wrapper.exists('.gio-table-column-title-info')).toBe(true);
    expect(wrapper.exists('.gio-table-column-filter')).toBe(true);
    expect(wrapper.exists('.gio-table-column-sorter')).toBe(true);
  });

  test('useHackOnRow hook', () => {
    const onClick = jest.fn();
    const onMouseUp = jest.fn();
    const onMouseDown = jest.fn();
    const wrapper = mount(getTable());
    wrapper.setProps({ hackRowEvent: true });
    wrapper.setProps({ onRow: () => ({ onClick, onMouseUp, onMouseDown }) });
    act(() => {
      wrapper.find('.gio-table-row').at(0).simulate('click');
      wrapper.find('.gio-table-row').at(0).simulate('mouseup');
      wrapper.find('.gio-table-row').at(0).simulate('mousedown');
    });
    expect(onClick).toBeCalled();
    expect(onMouseUp).toBeCalled();
    expect(onMouseDown).toBeCalled();
  });

  it('won`t trigger onRow click', () => {
    const onClick = jest.fn();
    const wrapper = mount(getTable());
    wrapper.setProps({ rowSelection: {}, onRow: () => ({ onClick }), onHeaderRow: () => ({ onClick }) });
    act(() => {
      wrapper.find('.gio-checkbox-input').at(0).simulate('click');
    });
    act(() => {
      wrapper.find('.gio-checkbox-input').at(1).simulate('click');
    });
    expect(onClick).not.toBeCalled();
    act(() => {
      wrapper.find('.gio-table-cell').at(1).simulate('click');
    });
    expect(onClick).toBeCalled();
  });

  it('will get Table Element instance', () => {
    let dom;
    mount(<Table ref={(_dom) => { dom = _dom }} />);
    expect(dom.className).toBe('gio-table-wrapper gio-table-showHover');
  })
});
