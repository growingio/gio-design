import React from 'react';
import { render } from 'enzyme';
import Avatar from '../../avatar';

describe('Avatar', () => {
  it('renders correctly', () => {
    const wrapper = render(<Avatar />);
    expect(wrapper).toMatchSnapshot();
  });
});
