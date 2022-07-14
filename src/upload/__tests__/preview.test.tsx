/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import React from 'react';
import { UploadFile } from '../interface';
import Preview, { PreviewForNotImage } from '../Preview';

describe('Test Preview', () => {
  it('render image preview', () => {
    const { container } = render(<Preview file={{ dataUrl: 'http://a.png' } as UploadFile<any>} />);
    expect(container.querySelector('img')).toHaveAttribute('src', 'http://a.png');
  });

  it('render other file preview', () => {
    const { rerender } = render(<PreviewForNotImage file={{ name: 'a.csv', status: 'success' } as UploadFile<any>} />);
    expect(screen.queryByLabelText('success-filled')).toBeTruthy();
    expect(screen.queryByText('.csv')).toBeTruthy();

    rerender(<PreviewForNotImage file={{ name: 'a.pdf', status: 'error' } as UploadFile<any>} />);
    expect(screen.queryByText('.pdf')).toBeTruthy();

    rerender(<PreviewForNotImage file={{ name: 'a.doc', status: 'error' } as UploadFile<any>} />);
    // screen.debug();

    expect(screen.queryByText('a.doc')).toBeTruthy();

    rerender(<PreviewForNotImage file={{ name: 'a.xlsx', status: 'error' } as UploadFile<any>} />);
    expect(screen.queryByText('a.xlsx')).toBeTruthy();
    rerender(<PreviewForNotImage file={{ name: 'a.txt', status: 'error' } as UploadFile<any>} />);
    expect(screen.queryByText('a.txt')).toBeTruthy();

    rerender(<PreviewForNotImage file={{ name: 'a.xx', status: 'error' } as UploadFile<any>} />);
    expect(screen.queryByText('a.xx')).toBeTruthy();
  });
});
