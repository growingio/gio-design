import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import SearchBar from '../search-bar';

describe('<SearchBar />', () => {
  it('can input value', async () => {
    const wrapper = mount(<SearchBar />);
    act(() => {
      wrapper.find('input').simulate('change', { target: { value: '123' } });
    });

    expect(wrapper.find('input').getDOMNode().value).toBe('123');

    wrapper.setProps({ lazySearch: true });

    act(() => {
      wrapper.find('input').simulate('change', { target: { value: '234' } });
      wrapper.find('input').simulate('keyup', { key: 'Enter' });
    });
    expect(wrapper.find('input').getDOMNode().value).toBe('234');
  });

  it('can be cleared by click click-button', () => {
    const fn = jest.fn();
    const wrapper = mount(<SearchBar value="1" onSearch={fn} />);
    expect(wrapper.find('input').getDOMNode().value).toBe('1');

    act(() => {
      wrapper.find('.clear-btn').simulate('click');
    });

    expect(wrapper.find('input').getDOMNode().value).toBe('');
  });

  it('should lazy change', () => {
    const fn = jest.fn();
    const wrapper = mount(<SearchBar lazySearch onSearch={fn} />);

    act(() => {
      wrapper.find('input').simulate('change', { target: { value: '1' } });
    });
    expect(fn).not.toBeCalled();

    act(() => {
      wrapper.find('input').simulate('keyup', { key: 'Enter' });
    });
    expect(fn).toBeCalled();
  });

  it('can be triggered by composition event', () => {
    const fn = jest.fn();
    const wrapper = mount(<SearchBar onSearch={fn} />);
    const input = wrapper.find('input');

    act(() => {
      input.simulate('compositionStart');
    });
    act(() => {
      input.simulate('change', { target: { value: '2' } });
    });
    expect(fn).not.toBeCalled();

    act(() => {
      input.simulate('compositionEnd');
    });
    expect(fn).toBeCalled();
  });
});
