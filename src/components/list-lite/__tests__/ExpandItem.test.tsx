import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ExpandItem from '../ExpandItem';

describe('ExpandItem', () => {
  it('render without props', () => {
    render(<ExpandItem />);
    expect(screen.queryByRole('option')).toBeTruthy();
    expect(screen.queryByText('展开全部')).toBeTruthy();
  });

  it('calls onClick prop when clicked', () => {
    const handleClick = jest.fn();
    render(<ExpandItem onClick={handleClick} />);
    const item = screen.getByRole('option');
    expect(item).not.toBeNull();
    fireEvent.click(item);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
