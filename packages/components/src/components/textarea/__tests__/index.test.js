import React from 'react';
import { render } from 'enzyme';
import Textarea from '..';

describe('Testing Textarea', () => {
  it('renders correctly', () => {
    const wrapper = render(<Textarea />);
    expect(wrapper).toMatchSnapshot();
  });
});
