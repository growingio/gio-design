import React from 'react';
import { render } from 'enzyme';
import Tag from '../../tag';

describe('Tag', () => {
  it('renders correctly', () => {
    const wrapper = render(<Tag />);
    expect(wrapper).toMatchSnapshot();
  });
});
