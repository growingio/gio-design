import React from 'react';
import { render } from 'enzyme';
import Checkbox from '../../checkbox';

describe('Checkbox', () => {
  it('renders correctly', () => {
    const wrapper = render(<Checkbox />);
    expect(wrapper).toMatchSnapshot();
  });
});
