import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Toggles from '../toggles.tsx';

describe('Testing Toggles', () => {
  it('should mount and unmount Toggles with no error.', () => {
    const wrapper = mount(<Toggles />);
    expect(() => {
      wrapper.setProps({});
      wrapper.unmount();
    }).not.toThrow();
  });

  // it('should render correctly', () => {
  //   const domTree = renderer.create(<Toggles disabled defaultChecked />).toJSON();
  //   expect(domTree).toMatchSnapshot();
  // });

  it('should return "false" when change on defaultChecked Toggles.', () => {
    const onChange = jest.fn();
    const wrapper = mount(<Toggles defaultChecked onChange={onChange} />);
    wrapper.find('.gio-toggles').at(0).simulate('click');

    expect(onChange).toHaveBeenCalled();
    // expect(onChange.mock.calls[0][0].target.checked).toBe(false);
  });

  it('toggles with suffixContent', () => {
    const wrapper = mount(<Toggles defaultChecked suffixContent />);
    // expect(wrapper.find('.suffixContent').text()).to.equals('开');
    expect(wrapper.exists('.gio-toggles-suffixContent')).toBe(true);
    expect(wrapper.find('.gio-toggles-suffixContent').text()).toEqual('开');
  });

  it('checked not equal to undefined', () => {
    const onChange = jest.fn();
    const wrapper = mount(<Toggles checked onChange={onChange} />);
    expect(wrapper.exists('.gio-toggles-checked')).toBeTruthy();
    wrapper.find('.gio-toggles').at(0).simulate('click');
    expect(onChange).toHaveBeenCalled();
  });

  it('toggles component should be disabled', () => {
    const wrapper = mount(<Toggles disabled />);
    expect(wrapper.exists('.gio-toggles-disabled')).toBeTruthy();
  });

  it('when users click the toggles component, it should be executed event function', () => {
    const onClick = jest.fn();
    const wrapper = mount(<Toggles defaultChecked onClick={onClick} />);
    wrapper.find('.gio-toggles').at(0).simulate('click');
    expect(onClick).toHaveBeenCalled();
  });
});
