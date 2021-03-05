import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Link from '..';

describe('Test Link', () => {
  const saveLocation = window.location;
  afterAll(() => {
    delete global.window.location;
    global.window.location = saveLocation;
  });

  it('should mount and unmount Link with no error.', () => {
    const wrapper = mount(<Link to="https://www.growingio.com">GrowingIO</Link>);
    expect(() => {
      wrapper.setProps({});
      wrapper.unmount();
    }).not.toThrow();
  });

  it('should render correctly', () => {
    const domTree = renderer
      .create(
        <Link className="gio-customized-link" to="https://www.growingio.com" disabled>
          GrowingIO
        </Link>
      )
      .toJSON();
    expect(domTree).toMatchSnapshot();
  });

  it('should render with custom component `div`', () => {
    const wrapper = shallow(
      <Link to="https://www.growingio.com" component="div">
        Custom Component
      </Link>
    );
    expect(wrapper.name()).toEqual('div');
  });

  it('should response click event', () => {
    const onClick = jest.fn();

    const wrapper = mount(
      <Link to="https://www.growingio.com" component="div" onClick={onClick}>
        Custom Component
      </Link>
    );

    wrapper.simulate('click');
    expect(onClick).toHaveBeenCalled();
  });

  it('It should show or hide', () => {
    const wrapper = mount(
      <Link component="div" to="https://www.growingio.com" disabled>
        GrowingIO
      </Link>
    );
    wrapper.simulate('click');
    expect(wrapper.exists('.gio-link--disabled')).toBe(true);
  });
  it('should accept undefined link', () => {
    const onClick = jest.fn();

    const wrapper = mount(
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <Link component="div" to={undefined} onClick={onClick}>
        GrowingIO
      </Link>
    );
    wrapper.simulate('click');
    expect(onClick).toHaveBeenCalled();
  });

  it('should direct to right location', () => {
    delete global.window.location;
    global.window.location = { href: '' };

    const wrapper = mount(
      <Link component="div" to="https://www.growingio.com">
        GrowingIO
      </Link>
    );
    wrapper.simulate('click');
    expect(window.location.href).toEqual('https://www.growingio.com');
  });
  it('not pointing in the right place', () => {
    delete global.window.location;
    global.window.location = { href: '' };

    const wrapper = mount(
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <Link component="div" to={undefined}>
        GrowingIO
      </Link>
    );
    wrapper.simulate('click');
    expect(window.location.href).not.toEqual('https://www.growingio.com');
  });
});
