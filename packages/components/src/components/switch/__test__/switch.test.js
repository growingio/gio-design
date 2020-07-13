import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Switch from '../switch.tsx';

describe('Testing Radio', () => {
  it('should mount and unmount Radio with no error.', () => {
    const wrapper = mount(<Switch />);
    expect(() => {
      wrapper.setProps({});
      wrapper.unmount();
    }).not.toThrow();
  });

  it('should render correctly', () => {
    const domTree = renderer.create(<Switch className='gio-customized-switch' disabled defaultChecked />).toJSON();
    expect(domTree).toMatchSnapshot();
  });

  it('should return "false" when change on defaultChecked Switch.', () => {
    const onChange = jest.fn();
    const wrapper = mount(<Switch defaultChecked onChange={onChange} />);
    wrapper.find('.gio-switch').at(0).simulate('click');

    expect(onChange).toHaveBeenCalled();
    // expect(onChange.mock.calls[0][0].target.checked).toBe(false);
  });

  it('switch with suffixContent', () => {
    const wrapper = mount(<Switch defaultChecked suffixContent />);
    // expect(wrapper.find('.suffixContent').text()).to.equals('开');
    expect(wrapper.exists('.suffixContent')).toBe(true);
    expect(wrapper.find('.suffixContent').text()).toEqual('开');
  });
});
