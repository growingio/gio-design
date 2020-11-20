import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { waitFor } from '@testing-library/react';
import React from 'react';
import { NodeData } from '../menu-item';
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
    expect(wrapper.find('.foo-cascader')).toHaveLength(1);
  });

  it('should popup a searchable menu overlayer', async () => {
    const map = {} as { [key: string]: EventListenerOrEventListenerObject };
    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });
    const wrapper = mount(<Cascader visible keyword="a" searchPlaceholder="search" dataSource={menu} />);

    expect(document.querySelectorAll('.gio-dropdown.gio-cascader-dropdown')).toHaveLength(1);
    expect(wrapper.find('.cascader-menu-header input').getElement().props.value).toBe('a');
    expect(wrapper.find('.cascader-menu-list').text()).toBe('a');

    act(() => {
      wrapper.setProps({ keyword: 'b' });
    });
    await waitFor(() => {
      expect(wrapper.find('.cascader-menu-list').text()).toBe('b');
    });
    act(() => {
      wrapper.setProps({ keyword: '' });
    });
    await waitFor(() => {
      expect(wrapper.find('.cascader-menu-list').text()).toBe('ab');
    });

    act(() => {
      (map.click as any)({
        target: { classList: { contains: (cls: string) => cls === 'gio-cascader-dropdown' } },
      });
    });

    await waitFor(
      () => {
        expect(document.querySelectorAll('.gio-dropdown-hidden')).toHaveLength(1);
      },
      { timeout: 5000 }
    );
  });

  it('should render sub-menu', async () => {
    const dataSource = [{ label: 'a', value: 1, children: [] as NodeData[] }];
    const wrapper = mount(<Cascader dataSource={dataSource} visible trigger="click" />);

    act(() => {
      wrapper.find('.cascader-menu-item .cascader-menu-item-inner').simulate('click', { currentTarget: {} });
    });
    await waitFor(() => {
      expect(wrapper.find('.cascader-menu-list').text()).toEqual('a');
    });

    wrapper.setProps({ dataSource: [{ label: 'a', value: 1, children: [{ label: 'b', value: 2 }] }] });
    act(() => {
      wrapper.find('.cascader-menu-item .cascader-menu-item-inner').at(0).simulate('click', { currentTarget: {} });
    });

    await waitFor(() => {
      expect(wrapper.find('.cascader-menu-list').text()).toEqual('ab');
    });
  });

  it('should select a value', async () => {
    const onSelect = jest.fn();
    const wrapper = mount(<Cascader visible dataSource={menu} onSelect={onSelect} trigger="click" />);

    act(() => {
      wrapper.find('.cascader-menu-item .cascader-menu-item-inner').at(0).simulate('click', { currentTarget: {} });
    });

    await waitFor(() => {
      expect(onSelect).toBeCalled();
    });

    wrapper.setProps({ selectAny: true });
    act(() => {
      wrapper.find('.cascader-menu-item .cascader-menu-item-inner').at(1).simulate('keyup', { key: 'Enter' });
    });
    await waitFor(() => {
      expect((wrapper.find('.gio-cascader-title input').getDOMNode() as HTMLInputElement).value).toEqual('b');
    });
  });

  it('can trigger a sub-menu', () => {
    const wrapper = mount(<Cascader visible dataSource={menu} trigger="click" />);

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
      wrapper.find('.cascader-menu-item .cascader-menu-item-inner').at(1).simulate('keydown', { key: ' ' });
      wrapper.find('.cascader-menu-item .cascader-menu-item-inner').at(1).simulate('keyup', { key: ' ' });
    });
    waitFor(() => {
      expect(wrapper.find('.cascader-menu-list').text()).toBe('abb-1');
    });
  });

  it('can deep search a word', async () => {
    const dataSource = [{ label: 'foo', value: 1, children: [{ label: 'bar', value: 2 }] }];
    const wrapper = mount(<Cascader visible deepSearch dataSource={dataSource} trigger="click" />);

    expect(wrapper.find('.cascader-menu-list').text()).toEqual('foo');

    act(() => {
      wrapper.find('.cascader-menu-header input').simulate('change', { target: { value: 'f' } });
    });
    await waitFor(() => {
      expect(wrapper.find('.cascader-menu-list').text()).toEqual('foo');
    });

    // deep search childNode
    act(() => {
      wrapper.find('.cascader-menu-header input').simulate('change', { target: { value: 'b' } });
    });
    await waitFor(() => {
      expect(wrapper.find('.cascader-menu-list').text()).toEqual('foo');
    });

    // open a sub-menu
    act(() => {
      wrapper.find('.cascader-menu-item .cascader-menu-item-inner').at(0).simulate('click', { currentTarget: {} });
    });
    await waitFor(() => {
      expect(wrapper.find('.cascader-menu-list').text()).toEqual('foobar');
    });
  });

  it('can triggered by mouseEnter', async () => {
    const wrapper = mount(<Cascader trigger="hover" dataSource={menu} visible />);

    act(() => {
      wrapper.find('.cascader-menu-item .cascader-menu-item-inner').at(1).simulate('mouseEnter', { currentTarget: {} });
    });

    await waitFor(() => {
      // expect(wrapper.find('.cascader-menu-item')).toHaveLength(3);
      expect(wrapper.find('.cascader-menu-list').text()).toEqual('abb-1');
    });
  });

  it('can render menu-item by user', () => {
    const wrapper = mount(
      <Cascader dataSource={menu} visible onRender={(t: NodeData) => <span className="custom-item">{t.label}</span>} />
    );

    expect(wrapper.find('.custom-item')).toHaveLength(2);
  });
});
