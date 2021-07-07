import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Forbidden, NotFound, InternalServerError } from '../Page.stories';

describe('Page', () => {
  it('can render forbidden page', () => {
    const handleAction = jest.fn();
    render(<Forbidden {...Forbidden.args} description="forbidden" cta={{ text: 'Back', onClick: handleAction }} />);
    expect(screen.queryByText('Back')).toBeTruthy();
    fireEvent.click(screen.getByText('Back'));
    expect(handleAction).toHaveBeenCalled();
  });

  it('can render not found page', () => {
    render(<NotFound {...NotFound.args} description="not found" />);
    expect(screen.queryByText('not found')).toBeTruthy();
  });

  it('can render interal server error page', () => {
    render(<InternalServerError {...InternalServerError.args} description="interal server error" />);
    expect(screen.queryByText('interal server error')).toBeTruthy();
  });
});
