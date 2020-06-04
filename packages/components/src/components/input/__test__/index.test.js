import React from 'react';
import { render } from 'enzyme';
import Input from '..';
import Icon from 'antd/lib/icon';

const suffix = <Icon type='search' />;

describe('Input', () => {
  it('renders correctly', () => {
    const testUnit = render(<Input key='01' />);
    expect(testUnit).toMatchSnapshot();
  });

  it('renders with props correctly', () => {
    const testUnit = render(<Input key='01' size='small' error='true' />);
    expect(testUnit).toMatchSnapshot();
  });

  it('renders with suffix correctly', () => {
    const testUnit = render(<Input key='01' size='small' error='true' suffix={suffix} />);
    expect(testUnit).toMatchSnapshot();
  });
});
