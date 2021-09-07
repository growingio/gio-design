import React from 'react';
import { render } from '@testing-library/react';
import Title from '../Title';

describe('Title', () => {
  it('testing Compoment', () => {
    render(<Title level={1}>标题</Title>);
  });
});
