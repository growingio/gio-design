import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Default } from '../Text.stories';
import Text from '../Text';
import 'raf/polyfill';

beforeEach(() => {
  jest.useFakeTimers();
});

describe('Testing Text', () => {
  it('basic text', () => {
    render(<Default {...Default.args} />);
    expect(screen.getAllByText('我是一个栗子', { exact: false })).toBeTruthy();
  });

  it('empty text', () => {
    const { rerender } = render(<Text />);
    expect(screen.queryByText('...')).not.toBeNull();
    rerender(<Text > <span /> </Text>);
    expect(screen.queryByText('...')).not.toBeNull();
  });

  it('other props', () => {
    render(
      <div style={{ width: '130px' }}>
        <Text lines={3} trimwhitespace ellipsis="---" placement="bottom">
          我是另一个栗子我是另一个栗子我是另一个栗子我是另一个栗子
        </Text>
      </div>
    );
    expect(screen.getByText('我是另一个栗子我是另一个栗子我是另一个栗子我是另一个栗子')).toBeTruthy();
  });

  it('text with children', () => {
    render(
      // eslint-disable-next-line react/no-children-prop
      <Text children="我是一个栗子" className="gio-text-test" style={{ fontSize: '20px' }} />
    );
    expect(screen.getByText('我是一个栗子')).toBeTruthy();
  });

  it('test onTruncate', () => {
    const { container } = render(<Text width={50}>我是一个栗子</Text>);
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(container.getElementsByClassName('gio-text')).toHaveLength(1);
  });
});
