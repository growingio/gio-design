import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Default } from '../SearchBar.stories';
import SearchBar from '../index';

describe('Testing search-bar', () => {
  it('basic search-bar', () => {
    const { container } = render(<Default {...Default.args} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '随便输点东西' } });
    expect(container.getElementsByClassName('gio-input__content')[0].getAttribute('value')).toEqual('随便输点东西');

    fireEvent.keyDown(container.getElementsByClassName('gio-input__content')[0], { key: 'Enter' });
    fireEvent.click(screen.getByRole('img'));
    expect(container.getElementsByClassName('gio-input__content')[0].getAttribute('value')).toEqual('');
  });

  it('should storage the search value', () => {
    const { container } = render(
      <div>
        <SearchBar
          size="middle"
          placeholder="请搜索..."
          storageNum={5}
          disabled={false}
          showStorage
          showClear
          allowClearStorage
        />
      </div>
    );
    fireEvent.focus(screen.getByRole('textbox'));
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '123456' } });

    fireEvent.click(screen.getByRole('img'));
    fireEvent.blur(screen.getByRole('textbox'));
    fireEvent.focus(screen.getByRole('textbox'));
    screen.logTestingPlaygroundURL();
  });
});
