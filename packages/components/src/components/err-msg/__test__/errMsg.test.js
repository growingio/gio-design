import React from 'react';
import { render } from 'enzyme';
import ErrMsg from '../../err-msg';

describe('ErrMsg', () => {
  it('renders correctly', () => {
    const wrapper = render(<ErrMsg />);
    expect(wrapper).toMatchSnapshot();
  });
});
