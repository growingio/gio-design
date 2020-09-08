import React from 'react';
import { mount, render } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Loading from '../Loading';

async function waitForComponentToPaint(wrapper, amount = 500) {
  await act(async () => new Promise((resolve) => setTimeout(resolve, amount)).then(() => wrapper.update()));
}

describe('Testing Loading', () => {
  const getLoading = () => <Loading>这是一个测试</Loading>;

  it('should be stable', () => {
    const wrapper = render(<Loading>快照</Loading>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should be mount, setProps, unmount with no error', () => {
    expect(() => {
      const wrapper = mount(<Loading />);
      wrapper.setProps({
        loading: true,
      });
      wrapper.unmount();
    }).not.toThrow();
  });

  test('props loading', (done) => {
    const wrapper = mount(getLoading());
    expect(wrapper.exists('.gio-loading')).toBe(true);
    wrapper.setProps({ loading: false });
    waitForComponentToPaint(wrapper).then(() => {
      expect(wrapper.exists('.gio-loading')).toBe(false);
      done();
    });
  });

  test('props indicator', () => {
    const wrapper = mount(getLoading());
    wrapper.setProps({ indicator: 'indicator' });
    expect(wrapper.exists('.gio-loading-indicator')).toBe(true);
    expect(wrapper.find('.gio-loading-indicator').at(0).text()).toBe('indicator');
  });

  test('props titlePosition and title', () => {
    const wrapper = mount(getLoading());
    wrapper.setProps({ titlePosition: 'right' });
    expect(wrapper.exists('.gio-loading-title-right')).toBe(true);
    wrapper.setProps({ title: '测试' });
    expect(wrapper.find('.gio-loading-title-right').at(0).text()).toBe('测试');
  });

  test('props delay', (done) => {
    const wrapper = mount(getLoading());
    wrapper.setProps({ delay: 500, loading: false });
    expect(wrapper.exists('.gio-loading')).toBe(true);
    waitForComponentToPaint(wrapper).then(() => {
      expect(wrapper.exists('.gio-loading')).toBe(false);
      done();
    });
  });

  test('props blurColor', () => {
    const wrapper = mount(getLoading());
    wrapper.setProps({ blurColor: 'black' });
    expect(wrapper.exists('.gio-loading')).toBe(true);
  });
});
