import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { waitFor } from '@testing-library/react';

import Cascader from '..';

const menu = [
  { label: 'a', value: 'a' },
  { label: 'b', value: 'b', children: [{ label: 'b-1', value: 'b-1' }] },
];

describe('<Cascader />', () => {
  it('should render a DOM', () => {
    const wrapper = mount(<Cascader className="test-cls" title="bar" placeholder="title ph" />);
    expect(wrapper.find('.gio-cascader')).toHaveLength(1);

    expect(wrapper.find('.gio-cascader.test-cls')).toHaveLength(1);

    expect(wrapper.find('.gio-cascader-title input').getElement().props.value).toBe('bar');

    expect(wrapper.find('.gio-cascader-title input').getElement().props.placeholder).toBe('title ph');

    wrapper.setProps({ prefixCls: 'foo' });
    expect(wrapper.find('.foo')).toHaveLength(1);
  });

  it('should popup a searchable menu overlayer', () => {
    const wrapper = mount(<Cascader visible keyword="a" searchPlaceholder="search" dataSource={menu} />);

    expect(wrapper.find('.gio-cascader-panel.cascader-menu-list')).toHaveLength(1);
    expect(wrapper.find('.cascader-menu-header input').getElement().props.value).toBe('a');

    expect(wrapper.find('.cascader-menu-list').text()).toBe('a');

    wrapper.setProps({ keyword: 'b' });
    expect(wrapper.find('.cascader-menu-list').text()).toBe('b');

    wrapper.setProps({ keyword: '' });
    expect(wrapper.find('.cascader-menu-list').text()).toBe('ab');
  });

  it('can trigger a sub-menu', () => {
    const wrapper = mount(<Cascader visible dataSource={menu} />);

    act(() => {
      wrapper
        .find('.cascader-menu-item .cascader-menu-item-inner')
        .at(1)
        .simulate('click', { currentTarget: { offsetLeft: 0, offsetTop: 0 } });
    });
    waitFor(() => {
      expect(wrapper.find('.cascader-menu-list').text()).toBe('abb-1');
    });
  });

  it('can use keyboard to trigger sub-menu', () => {
    const wrapper = mount(<Cascader visible dataSource={menu} />);

    act(() => {
      wrapper.find('.cascader-menu-item .cascader-menu-item-inner').at(1).simulate('keyup', { key: ' ' });
    });
    waitFor(() => {
      expect(wrapper.find('.cascader-menu-list').text()).toBe('abb-1');
    });
  });
});
