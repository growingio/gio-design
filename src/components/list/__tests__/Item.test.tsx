import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Item from '../Item';

const longText = 'Long long text, Long long text, Long long text';

describe('Item', () => {
  it('renders with default props', () => {
    render(<Item>Default item</Item>);
    expect(screen.getByRole('option')).not.toBeNull();
  });

  it('can be clicked', () => {
    const handleClick = jest.fn();
    render(<Item onClick={handleClick}>Default item</Item>);
    fireEvent.click(screen.getByRole('option'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('has mouse events', () => {
    const handleMouseEnter = jest.fn();
    const handleMouseLeave = jest.fn();
    render(
      <Item onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        Default item
      </Item>
    );
  });

  it('can not be clicked in disabled state', () => {
    const handleClick = jest.fn();
    render(
      <Item onClick={handleClick} disabled>
        Default item
      </Item>
    );
    fireEvent.click(screen.getByRole('option'));
    expect(handleClick).toHaveBeenCalledTimes(0);
  });

  it('can hide long text with ellipsis', () => {
    render(
      <div style={{ width: 20 }}>
        <Item>{longText}</Item>
      </div>
    );
    expect(screen.queryByText(/.../)).toBeTruthy();
  });

  it('can show long text with break line', () => {
    render(
      <div style={{ width: 20 }}>
        <Item ellipsis={false}>{longText}</Item>
      </div>
    );
    expect(longText).toBeTruthy();
  });
});
