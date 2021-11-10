import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Basic } from '../demos/ListSelector.stories';

describe('ListSelector', () => {
  it('renders basic items', () => {
    const onSelectSpy = jest.fn();
    render(<Basic {...Basic.args} placeholder="select" onSelect={onSelectSpy} />);
    fireEvent.click(screen.getByText('select'));
    const itemString = 'Item 0';
    fireEvent.click(screen.getByText(itemString));
    expect(screen.queryAllByText(itemString)).toHaveLength(2);
    expect(onSelectSpy).toHaveBeenCalledWith('item-0');

    fireEvent.mouseEnter(screen.getAllByText(itemString)[0]);
    fireEvent.click(screen.getByLabelText('close-circle-filled'));
    expect(screen.queryByText(/select/)).not.toBeNull();
  });
});
