import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { DesignContext, DefaultContextProps } from '@gio-design/utils';
import { Default } from '../demos/SearchBar.stories';
import SearchBar from '../index';
import enUS from '../../../locales/en-US';
import { sleep } from '../../../utils/test';

describe('Testing search-bar', () => {
  it('basic search-bar', () => {
    render(<Default {...Default.args} />);
    act(() => {
      fireEvent.focus(screen.getByRole('textbox'));
      fireEvent.change(screen.getByRole('textbox'), { target: { value: '我是一个栗子' } });
    });
    waitFor(() => expect(screen.getByRole('textbox').getAttribute('value')).toEqual('我是一个栗子'));
  });

  it('should clear the search value', async () => {
    render(<SearchBar showClear />);
    act(() => {
      fireEvent.change(screen.getByRole('textbox'), { target: { value: '我是一个栗子' } });
    });
    await waitFor(() => expect(screen.getByRole('textbox').getAttribute('value')).toEqual('我是一个栗子'));

    act(() => {
      fireEvent.click(screen.getByRole('img'));
    });
    await waitFor(() => expect(screen.getByRole('textbox').getAttribute('value')).toBe(''));
  });

  it('should store search value', async () => {
    localStorage.clear();
    const { rerender } = render(<SearchBar showClear showStorage id="demo" />);
    act(() => {
      fireEvent.focus(screen.getByRole('textbox'));
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'demo-demo' } });
    });
    act(() => {
      fireEvent.blur(screen.getByRole('textbox'));
    });

    act(() => {
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'demo2' } });
    });
    act(() => {
      fireEvent.blur(screen.getByRole('textbox'));
    });

    await rerender(<SearchBar showClear showStorage id="search" />);
    act(() => {
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'ok' } });
    });
    act(() => {
      fireEvent.blur(screen.getByRole('textbox'));
    });

    await waitFor(() => {
      const result = JSON.parse(localStorage.getItem('gio-searchbar-storage-search'));
      expect(result.length).toEqual(1);
    });
  });

  it('should show storage panel', async () => {
    render(<SearchBar showClear showStorage id="demo" />);
    act(() => {
      fireEvent.focus(screen.getByRole('textbox'));
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'demo-' } });
    });
    act(() => {
      fireEvent.blur(screen.getByRole('textbox'));
    });

    act(() => {
      fireEvent.click(screen.getByRole('img'));
      fireEvent.focus(screen.getByRole('textbox'));
    });
    await waitFor(() => {
      expect(screen.getByText('demo-demo')).toBeTruthy();
    });

    act(() => {
      fireEvent.click(screen.getByText(/demo2/i));
    });

    act(() => {
      fireEvent.keyUp(screen.getByRole('textbox'), { key: 'Escape' });
    });

    await waitFor(() => {
      expect(screen.getByRole('textbox').getAttribute('value')).toEqual('demo2');
    });
  });

  it('should not store old value', async () => {
    render(<SearchBar showClear showStorage id="demo" />);

    act(() => {
      fireEvent.change(screen.getByRole('textbox'), { target: { value: '' } });
      fireEvent.blur(screen.getByRole('textbox'));
    });

    await waitFor(() => {
      const store = JSON.parse(localStorage.getItem('gio-searchbar-storage-demo'));
      expect(store.length).toBe(3);
    });
  });

  it('multiple language', async () => {
    render(
      <DesignContext.Provider value={{ ...DefaultContextProps, local: enUS }}>
        <SearchBar showClear showStorage id="demo" allowClearStorage />
      </DesignContext.Provider>
    );

    act(() => {
      fireEvent.click(screen.getByRole('img'));
      fireEvent.focus(screen.getByRole('textbox'));
    });

    await waitFor(() => {
      expect(screen.getByText('Clear')).toBeTruthy();
    });

    act(() => {
      fireEvent.blur(screen.getByRole('textbox'));
    });

    sleep(200);

    await waitFor(() => {
      expect(screen.queryByText('Clear')).toBeNull();
    });
  });

  it('should clear the storage', async () => {
    render(<SearchBar showClear showStorage id="demo" allowClearStorage />);

    act(() => {
      fireEvent.click(screen.getByRole('img'));
      fireEvent.focus(screen.getByRole('textbox'));
    });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: '清除' })).toBeTruthy();
    });

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: '清除' }));
    });

    await waitFor(() => {
      const store = localStorage.getItem('gio-searchbar-storage-demo');
      expect(store).toBeNull();
    });
  });
});
