import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Select from '..';

describe('Testing Select', () => {
  it('should be able to render component', () => {
    const wrapper = mount(
      <Select>
        <Select.Option value='lucy'>lucy</Select.Option>
        <Select.Option value='lily'>lily</Select.Option>
        <Select.Option value='agnes'>agnes</Select.Option>
      </Select>
    );
    expect(wrapper.find('.ant-select-selection').length).toBe(1);
  });
});
