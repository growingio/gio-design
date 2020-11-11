import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import SearchBar from '../search-bar';

describe('<SearchBar />', () => {
  it('can input', async () => {
    const wrapper = mount(<SearchBar />);
    act(() => {
      wrapper.find('input').simulate('change', { target: { value: '123' } });
    });

    expect((wrapper.find('input').getDOMNode() as HTMLInputElement).value).toBe('123');

    wrapper.setProps({ lazySearch: true });

    act(() => {
      wrapper.find('input').simulate('change', { target: { value: '234' } });
      wrapper.find('input').simulate('keyup', { key: 'Enter' });
    });
    expect((wrapper.find('input').getDOMNode() as HTMLInputElement).value).toBe('234');
  });

  it('should be lazy change', () => {
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
});
