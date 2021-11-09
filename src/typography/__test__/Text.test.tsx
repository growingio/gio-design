import React from 'react';
import { render, screen } from '@testing-library/react';
import { Styles } from '../demos/Text.stories';

describe('Text', () => {
  it('show with different styles', () => {
    render(<Styles />);
    expect(screen.queryByText('...')).toBeNull();
  });
});
