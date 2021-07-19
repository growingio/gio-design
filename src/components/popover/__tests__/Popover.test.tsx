import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Default, ClickPopover, Arrow, Placement } from '../Popover.stories';

describe('Testing popover', () => {
  it('basic popover', () => {
    render(<Default {...Default.args} />);
    fireEvent.mouseEnter(screen.getAllByText(/hover me/i)[0]);
    expect(screen.getByText('广告阶段')).toBeTruthy();
  });

  it('click popover', () => {
    render(<ClickPopover {...ClickPopover.args} />);
    fireEvent.click(screen.getAllByText(/click me/i)[0]);
    expect(screen.getByRole('textbox')).toBeTruthy();
  });

  it('arrow popover', () => {
    render(<Arrow {...Arrow.args} />);
    fireEvent.mouseEnter(screen.getByText('Arrow points to center / 箭头指向中心'));
    expect(screen.getByText('广告阶段')).toBeTruthy();
  });

  it('different placement popover', () => {
    render(<Placement {...Placement.args} />);
    fireEvent.mouseEnter(screen.getAllByText(/left/i)[0]);
    expect(screen.getByText('广告阶段')).toBeTruthy();
  });
});
