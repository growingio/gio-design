import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Checkbox from '..';

describe('Checkbox', () => {
  it('render', () => {
    const wrapper = renderer
      .create(<Checkbox checked indeterminate disabled className="custom" style={{ color: 'red' }} />)
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });
  it('onChange callback', () => {
    const onChange = jest.fn();
    const wrapper = mount(<Checkbox onChange={onChange} />);
    wrapper.find('.gio-checkbox-input').at(0).simulate('change');

    expect(onChange).toHaveBeenCalled();
    expect(onChange.mock.calls[0][0].target.checked).toBe(false);
  });
});
