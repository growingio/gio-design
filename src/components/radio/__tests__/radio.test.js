import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Radio from '..';

describe('Testing Radio', () => {
  it('should mount and unmount Radio with no error.', () => {
    const wrapper = mount(<Radio />);
    expect(() => {
      wrapper.setProps({});
      wrapper.unmount();
    }).not.toThrow();
  });

  it('should render correctly', () => {
    const domTree = renderer
      .create(
        <Radio className="gio-customized-radio" disabled defaultChecked>
          Test
        </Radio>,
      )
      .toJSON();
    expect(domTree).toMatchSnapshot();
  });

  it('should return "true" when change on defaultChecked Radio.', () => {
    const onChange = jest.fn();
    const wrapper = mount(<Radio defaultChecked onChange={onChange} />);
    wrapper.find('.gio-radio-input').at(0).simulate('change');

    expect(onChange).toHaveBeenCalled();
    expect(onChange.mock.calls[0][0].target.checked).toBe(true);
  });

  it('responses hover events', () => {
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();

    const wrapper = mount(<Radio onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />);

    wrapper.find('label').simulate('mouseenter');
    expect(onMouseEnter).toHaveBeenCalled();

    wrapper.find('label').simulate('mouseleave');
    expect(onMouseLeave).toHaveBeenCalled();
  });
});
