import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Page from '../Page';

describe('Page', () => {
  it('can render forbidden page', () => {
    const handleAction = jest.fn();
    render(<Page statusCode={403} description="forbidden" cta={{ text: 'Create', onClick: handleAction }} />);
    expect(screen.queryByText('Create')).toBeTruthy();
    fireEvent.click(screen.getByText('Create'));
    expect(handleAction).toHaveBeenCalled();
  });
});
