import React from 'react';
import { render } from '@testing-library/react';
import Title from '../Title';

describe('Title', () => {
  it('testing Compoment', () => {
    const props = {
      level: 6,
      children: 'H1 标题',
    };
    render(<Title {...props} />);
  });

  it('testing children', () => {
    const props = {
      level: 1,
      children: 'H1 标题',
    };
    render(<Title {...props} />);
  });
});
