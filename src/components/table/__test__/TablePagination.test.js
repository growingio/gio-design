import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { mount } from 'enzyme';
import usePagination from '../hook/usePagination';
import Table from '../index';

const dataSource = Array.from({ length: 100 }, (_, key) => ({ key }));

describe('Testing Table Pagination', () => {
  test('when dataSource update and page count less than current, pagination reset', () => {
    const data10 = Array.from({ length: 10 }, (_, key) => ({ a: key, key }));
    const data20 = Array.from({ length: 20 }, (_, key) => ({ a: key, key }));

    const wrapper = mount(
      <Table
        title="列表标题"
        dataSource={data20}
        columns={[
          {
            title: 'a',
            dataIndex: 'a',
          },
        ]}
        pagination={{
          pageSize: 5,
        }}
      />
    );
    // update
    wrapper.find('.gio-pagination-item').at(3).simulate('click');
    wrapper.setProps({ dataSource: data10 });
    expect(() => {
      expect(wrapper.find('.gio-pagination-item').first().text()).toBe('1');
      expect(wrapper.find('.gio-pagination-total-text').first().text()).toBe(`总共 ${Number(10).toLocaleString()} 条`);
    });
    // not update
    wrapper.find('.gio-pagination-item').at(1).simulate('click');
    wrapper.setProps({ dataSource: data20 });
    expect(() => {
      expect(wrapper.find('.gio-pagination-item-active').first().text()).toBe('2');
      expect(wrapper.find('.gio-pagination-total-text').first().text()).toBe(`总共 ${Number(20).toLocaleString()} 条`);
    });
  });

  test('usePagination hook', () => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { result } = renderHook(({ dataSource, pagination }) => usePagination(dataSource, pagination, true), {
      initialProps: {
        dataSource,
        pagination: {},
      },
    });
    const [transformShowIndexPipeline, activePaginationState, paginationData, PaginationComponent] = result.current;
    const wrapper = mount(<PaginationComponent onTriggerStateUpdate={() => {/**/}} />);
    expect(transformShowIndexPipeline([])).toHaveLength(1);
    expect(transformShowIndexPipeline([])[0].render(undefined, undefined, 0)).toBe(1);
    act(() => {
      wrapper.find('.gio-pagination-item').at(1).simulate('click');
    });
    expect(result.current[1].current).toBe(2);
    expect(result.current[2][0].key).toBe(10);
  });
});
