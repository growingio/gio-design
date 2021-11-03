import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import Preview, { PreviewForNotImage } from '../Preview';

const testFile = new File(['abc'], 'test.doc', { type: 'doc' });

describe('Testing preview', () => {
  window.requestAnimationFrame = (callback) => {
    window.setTimeout(callback, 16);
    return 0;
  };
  window.cancelAnimationFrame = (id) => {
    window.clearTimeout(id);
  };

  it('baisc preview', () => {
    const { container } = render(<Preview file={testFile as any} size={14} />);
    expect(container.getElementsByClassName('gio-upload__preview')).toHaveLength(1);
  });

  it('pdf file', () => {
    const mockFile = new File(['pdf'], 'test.pdf', { type: 'pdf' });
    const props = {
      file: mockFile,
    } as any;
    render(<PreviewForNotImage {...props} />);
    expect(screen.getByText('test.pdf')).toBeTruthy();
  });

  it('xls file', () => {
    render(<PreviewForNotImage file={new File(['xls'], 'test.xls', { type: 'xls' }) as any} />);
    expect(screen.getByText('test.xls')).toBeTruthy();
  });

  it('csv file', () => {
    const mockFile = new File(['csv'], 'test.csv', { type: 'csv' });
    render(<PreviewForNotImage file={mockFile as any} />);
    expect(screen.getByText('test.csv')).toBeTruthy();
  });

  it('txt file', () => {
    const mockFile = new File(['txt'], 'test.txt', { type: 'txt' });
    const props = {
      file: mockFile,
      status: 'success',
    } as any;
    render(<PreviewForNotImage {...props} />);
    expect(screen.getByText('test.txt')).toBeTruthy();
  });

  it('other file', () => {
    const mockFile = new File(['css'], 'test.css', { type: 'css' });
    render(<PreviewForNotImage file={mockFile as any} />);
    expect(screen.getByText('test.css')).toBeTruthy();
  });

  it('empty preview', () => {
    const props = {} as any;
    const { container } = render(<Preview {...props} />);
    expect(container.getElementsByClassName('gio-upload__preview')).toHaveLength(1);
  });

  it('empty preview with name', () => {
    render(<PreviewForNotImage file={{ name: 'test' } as any} />);
    expect(screen.getByText('test')).toBeTruthy();
  });

  it('test onReSelect', () => {
    const onReSelectMock = jest.fn();
    const onRemoveMock = jest.fn();
    render(
      <PreviewForNotImage
        file={{ name: 'test.txt', status: 'success', uid: 'a123' } as any}
        onReSelect={onReSelectMock}
        onRemove={onRemoveMock}
      />
    );
    act(() => {
      fireEvent.click(screen.getByRole('button', { name: '重新选择' }));
    });
    waitFor(() => {
      expect(onReSelectMock).toBeCalled();
    });
  });

  it('without onReSelect', () => {
    render(<PreviewForNotImage file={{ name: 'test.txt', status: 'success', uid: 'a123' } as any} />);
    act(() => {
      fireEvent.click(screen.getByRole('button', { name: '重新选择' }));
    });
    waitFor(() => {
      expect(screen.queryByText('test.txt')).toBeNull();
    });
  });
});
