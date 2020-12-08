import React from 'react';
import { mount, render } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Pagination from '../Pagination';
import { generatePageArray } from '../ until';

describe('Testing Pagination', () => {
  it('should be stable', () => {
    const wrapper = render(<Pagination total={1100} showQuickJumper showSizeChanger />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should be mount, setProps, unmount with no error', () => {
    expect(() => {
      const wrapper = mount(<Pagination total={1100} />);
      wrapper.setProps({
        disabled: true,
        defaultCurrent: 10,
        total: 1200,
        current: 12,
        defaultPageSize: 50,
      });
      wrapper.unmount();
    }).not.toThrow();
  });

  test('props disabled', () => {
    const wrapper = mount(<Pagination disabled total={1100} />);
    expect(wrapper.exists('.gio-pagination-disabled')).toBe(true);
  });

  test('props defaultCurrent', () => {
    const wrapper = mount(<Pagination defaultCurrent={10} total={1100} />);
    expect(wrapper.find('.gio-pagination-item-active').first().text()).toBe('10');
  });

  test('props total', () => {
    const wrapper = mount(<Pagination total={1100} />);
    expect(wrapper.find('.gio-pagination-total-text').first().text()).toBe(`总共 ${Number(1100).toLocaleString()} 条`);
  });

  test('props showTotal', () => {
    const wrapper = mount(
      <Pagination
        total={1100}
        showTotal={(total, range) => `总共 ${Number(total).toLocaleString()} 条, 范围${range[0]}-${range[1]}`}
      />
    );
    expect(wrapper.find('.gio-pagination-total-text').first().text()).toBe(
      `总共 ${Number(1100).toLocaleString()} 条, 范围1-10`
    );
    act(() => {
      wrapper.setProps({ showTotal: false });
    });
    expect(wrapper.exists('.gio-pagination-total-text')).toBe(false);
  });

  test('props pageSize', () => {
    const total = 1100;
    const pageSize = 100;
    const wrapper = mount(<Pagination pageSize={pageSize} total={total} />);
    expect(wrapper.find('.gio-pagination-item').last().text()).toBe(Math.ceil(total / pageSize).toString());
  });

  test('props showQuickJumper', () => {
    const onChange = jest.fn();
    const wrapper = mount(<Pagination onChange={onChange} showQuickJumper total={1100} />);
    expect(wrapper.exists('.gio-pagination-options-quick-jumper')).toBe(true);
    const input = wrapper.find('.gio-pagination-options-quick-jumper').find('input');
    input.simulate('change', { target: { value: 10 } });
    input.simulate('keyDown', { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith(10, 10);
  });

  test('props hideOnSinglePage', () => {
    const wrapper = mount(<Pagination hideOnSinglePage total={10} />);
    expect(wrapper.exists('.gio-pagination')).toBe(false);
  });

  test('porps onChange', () => {
    const onChange = jest.fn();
    const wrapper = mount(<Pagination onChange={onChange} total={110} />);
    wrapper.find('.gio-pagination-jump-next').at(0).simulate('click');
    expect(onChange).toHaveBeenCalledWith(6, 10);
    wrapper.find('.gio-pagination-jump-next').at(0).simulate('click');
    expect(onChange).toHaveBeenCalledWith(11, 10);

    wrapper.find('.gio-pagination-jump-prev').at(0).simulate('click');
    wrapper.find('.gio-pagination-next').at(0).simulate('click');
    wrapper.find('.gio-pagination-jump-next').at(0).simulate('click');
    expect(onChange).toHaveBeenCalledWith(11, 10);

    wrapper.find('.gio-pagination-next').at(0).simulate('click');
    expect(onChange).toHaveBeenCalledWith(11, 10);

    wrapper.find('.gio-pagination-jump-prev').at(0).simulate('click');
    expect(onChange).toHaveBeenCalledWith(6, 10);
    wrapper.find('.gio-pagination-jump-prev').at(0).simulate('click');
    expect(onChange).toHaveBeenCalledWith(1, 10);

    wrapper.find('.gio-pagination-jump-next').at(0).simulate('click');
    wrapper.find('.gio-pagination-prev').at(0).simulate('click');
    wrapper.find('.gio-pagination-jump-prev').at(0).simulate('click');
    expect(onChange).toHaveBeenCalledWith(1, 10);

    wrapper.find('.gio-pagination-prev').at(0).simulate('click');
    expect(onChange).toHaveBeenCalledWith(1, 10);
  });

  test('generatePageArray function', () => {
    const prevSymbol = { current: Symbol('prev') };
    const nextSymbol = { current: Symbol('next') };
    const result1 = generatePageArray(8, 11, 5, prevSymbol, nextSymbol);
    expect(result1).toEqual([1, prevSymbol.current, 6, 7, 8, 9, 10, 11]);
    const result2 = generatePageArray(4, 11, 5, prevSymbol, nextSymbol);
    expect(result2).toEqual([1, 2, 3, 4, 5, 6, nextSymbol.current, 11]);
    const result3 = generatePageArray(7, 11, 5, prevSymbol, nextSymbol);
    expect(result3).toEqual([1, prevSymbol.current, 5, 6, 7, 8, 9, nextSymbol.current, 11]);
    const result4 = generatePageArray(9, 11, 5, prevSymbol, nextSymbol);
    expect(result4).toEqual([1, prevSymbol.current, 7, 8, 9, 10, 11]);
    const result5 = generatePageArray(3, 11, 5, prevSymbol, nextSymbol);
    expect(result5).toEqual([1, 2, 3, 4, 5, nextSymbol.current, 11]);
    const result6 = generatePageArray(3, 10, 5, prevSymbol, nextSymbol);
    expect(result6).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  // test('size changer', () => {
  //   const onChange = jest.fn();
  //   const onShowSizeChanger = jest.fn();
  //   const wrapper = mount(
  //     <Pagination
  //       onChange={onChange}
  //       showSizeChanger
  //       showQuickJumper
  //       onShowSizeChanger={onShowSizeChanger}
  //       total={1100}
  //     />
  //   );
  //   expect(wrapper.exists('.gio-pagination-options-size-changer')).toBe(true);
  //   const sizeChanger = wrapper.find('.gio-pagination-options-size-changer').find('input');
  //   const input = wrapper.find('.gio-pagination-options-quick-jumper').find('input');
  //   input.simulate('change', { target: { value: 110 } });
  //   sizeChanger.simulate('change', { target: { value: '100' } });
  //   expect(onChange).toHaveBeenCalledWith(11, 100);
  //   expect(onShowSizeChanger).toHaveBeenCalledWith(11, 100);
  // });
});
