import React from 'react';
import { render } from 'enzyme';
import Icon from '../../icon';

describe('Icon', () => {
  it('renders correctly', () => {
    const wrapper = render(<Icon name='gicon-alert' style={{ fill: 'rgb(255, 70, 66)' }} size='small' />);
    expect(wrapper).toMatchSnapshot();
  });
});
