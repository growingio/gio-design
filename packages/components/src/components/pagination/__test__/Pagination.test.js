import React from 'react';
import { mount, render } from 'enzyme';
import Pagination from '../Pagination';

describe('Testing Pagination', () => {
  it('should be stable', () => {
    const wrapper = render(<Pagination total={1100} showQuickJumper />);
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
        pageSize: 50,
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

  test('props pageSize', () => {
    const total = 1100;
    const pageSize = 100;
    const wrapper = mount(<Pagination pageSize={pageSize} total={total} />);
    expect(wrapper.find('.gio-pagination-item').last().text()).toBe(Math.ceil(total / pageSize).toString());
  });

  test('props showQuickJumper', () => {
    const wrapper = mount(<Pagination showQuickJumper total={1100} />);
    expect(wrapper.exists('.gio-pagination-options-quick-jumper')).toBe(true);
  });

  test('props hideOnSinglePage', () => {
    const wrapper = mount(<Pagination hideOnSinglePage total={10} />);
    expect(wrapper.exists('.gio-pagination')).toBe(false);
  });

  test('porps onChange', () => {
    const onChange = jest.fn();
    const wrapper = mount(<Pagination onChange={onChange} total={1100} />);
    wrapper.find('.gio-pagination-item').last().simulate('click');
    expect(onChange).toHaveBeenCalled();
  });
});
