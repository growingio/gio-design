import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import SearchBar from '../search-bar';

describe('<SearchBar />', () => {
  it('can input value', async () => {
    const { container, rerender } = render(<SearchBar />);
    act(() => {
      fireEvent.change(container.getElementsByTagName('input')[0], { target: { value: '123' } });
    });

    expect(container.getElementsByTagName('input')[0].value).toBe('123');

    rerender(<SearchBar lazySearch />);

    act(() => {
      fireEvent.change(container.getElementsByTagName('input')[0], { target: { value: '234' } });
      fireEvent.keyUp(container.getElementsByTagName('input')[0], { key: 'Enter' });
    });
    expect(container.getElementsByTagName('input')[0].value).toBe('234');
  });

  it('can be cleared by click click-button', () => {
    const fn = jest.fn();
    const { container } = render(<SearchBar value="1" onSearch={fn} />);
    expect(container.getElementsByTagName('input')[0].value).toBe('1');

    act(() => {
      fireEvent.click(container.getElementsByClassName('clear-btn')[0]);
    });

    expect(container.getElementsByTagName('input')[0].value).toBe('');
  });

  it('should lazy change', () => {
    const fn = jest.fn();
    const { container } = render(<SearchBar lazySearch onSearch={fn} />);

    act(() => {
      fireEvent.change(container.getElementsByTagName('input')[0], { target: { value: '1' } });
    });
    expect(fn).not.toBeCalled();

    act(() => {
      fireEvent.keyUp(container.getElementsByTagName('input')[0], { key: 'Enter' });
    });
    expect(fn).toBeCalled();
  });

  it('can be triggered by composition event', () => {
    const fn = jest.fn();
    const { container } = render(<SearchBar onSearch={fn} />);

    act(() => {
      fireEvent.compositionStart(container.getElementsByTagName('input')[0]);
    });
    act(() => {
      fireEvent.change(container.getElementsByTagName('input')[0], { target: { value: '2' } });
    });
    expect(fn).not.toBeCalled();

    act(() => {
      fireEvent.compositionEnd(container.getElementsByTagName('input')[0]);
    });
    expect(fn).toBeCalled();
  });
});
