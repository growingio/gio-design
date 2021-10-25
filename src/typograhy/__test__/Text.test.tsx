import React from 'react';
import { render, screen } from '@testing-library/react';
import { Empty, Styles } from '../demos/Text.stories';

describe('Text', () => {
  it('show with different styles', () => {
    render(<Styles />);
    expect(screen.queryByText('...')).toBeNull();
  });

  it('render nothing with empty text', () => {
    const { container } = render(<Empty {...Empty.args} />);
    expect(container.querySelector('.gio-text')).toBeNull();
  });
});
