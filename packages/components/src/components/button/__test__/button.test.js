import React from 'react';
import { render } from 'enzyme';
import Button from '../../button';

describe('Button', () => {
  it('renders correctly', () => {
    const wrapper = render(<Button>Follow</Button>);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with tip correctly', () => {
    const wrapper = render(<Button tooltip='tooltip'>Follow</Button>);
    expect(wrapper).toMatchSnapshot();
  });
});
