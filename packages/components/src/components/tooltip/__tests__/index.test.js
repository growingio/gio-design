import React from 'react';
import { render, mount } from 'enzyme';
import Tooltip from '..';

describe('Testing Tooltip', () => {
  it('renders correctly', () => {
    const wrapper = render(<Tooltip>trigger</Tooltip>);
    expect(wrapper).toMatchSnapshot();
  });
});
