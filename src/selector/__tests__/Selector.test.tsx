import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Content, IconContent, CustomizeTrigger, CustomizeSuffix, Placeholder } from '../Selector.stories';

describe('Selector', () => {
  it('renders text item', () => {
    const handleOnClear = jest.fn();
    render(<Content {...Content.args} onClear={handleOnClear} />);
    const item = screen.queryByText(/Content/);
    expect(item).toBeDefined();
    fireEvent.mouseEnter(item.parentElement);
    const closeItem = screen.getByLabelText('close-circle-filled');
    expect(closeItem).toBeDefined();
    fireEvent.click(closeItem);
    expect(handleOnClear).toHaveBeenCalled();
    fireEvent.mouseLeave(item.parentElement);
  });

  it('renders text item with icon', () => {
    render(<IconContent {...IconContent.args} />);
    const iconItem = screen.getByLabelText('folder-outlined');
    expect(iconItem).toBeDefined();
    fireEvent.mouseEnter(iconItem.parentElement);
    fireEvent.click(screen.getByLabelText('close-circle-filled'));
  });

  it('renders value in button mode', () => {
    render(<CustomizeTrigger {...CustomizeTrigger.args} />);
    const trigger = screen.getByText(/Select/);
    expect(trigger).toBeDefined();
    fireEvent.click(trigger);
    expect(screen.getByText(/picker/));
  });

  it('renders with customize suffix', () => {
    render(<CustomizeSuffix {...CustomizeSuffix.args} />);
    expect(screen.getByLabelText('calendar-outlined')).toBeDefined();
  });

  it('renders placeholder', () => {
    const handleVisibleChange = jest.fn();
    render(<Placeholder {...Placeholder.args} onVisibleChange={handleVisibleChange} />);
    const placeholder = screen.getByText(/please/);
    expect(placeholder).toBeDefined();
    fireEvent.click(placeholder);
    expect(screen.getByLabelText('up-filled'));
    expect(handleVisibleChange).toHaveBeenCalled();
  });
});
