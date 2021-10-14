import React from 'react';
import { set } from 'lodash';
import { render, screen, fireEvent } from '@testing-library/react';
import Actions from '../Actions';

const testFile = new File(['abc'], 'test.doc', { type: 'doc' });
describe('Testing Actions', () => {
  it('should be stable', () => {
    render(<Actions file={testFile as any} onRemove={() => null} />);
    expect(screen.getByLabelText('delete-outlined')).toBeTruthy();
  });

  it('should be mount, setProps, unmount with no error', () => {
    const newFile = new File(['abcd'], 'new.doc', { type: 'doc' });
    expect(() => {
      const { rerender, unmount } = render(<Actions file={testFile as any} onRemove={() => null} />);
      rerender(<Actions file={newFile as any} onRemove={() => null} />);
      unmount();
    }).not.toThrow();
  });
});

describe('Testing Actions Events', () => {
  it('should remove when click', () => {
    const onRemove = jest.fn();
    const { container } = render(<Actions file={testFile as any} onRemove={onRemove} />);
    expect(container.getElementsByClassName('gio-upload__actions-icon')).toBeTruthy();
    fireEvent.click(container.getElementsByTagName('svg')[0]);
    expect(onRemove).toBeCalled();
  });
  it('should stop default events', () => {
    set(global.document, 'getElementsByClassName', () => [
      {
        contains: () => false,
      },
    ]);
    const onRemove = jest.fn();
    set(testFile, 'status', 'success');
    const { container } = render(<Actions file={testFile as any} onRemove={onRemove} />);
    fireEvent.click(container.getElementsByClassName('gio-upload__actions')[0]);
  });
});
