/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import React from 'react';
import Upload, { IUploadFile } from '..';

describe('Test Upload', () => {
  it('render correctly', () => {
    const { container } = render(<Upload />);
    expect(container.querySelector('.gio-upload')).toBeInTheDocument();
    expect(screen.findByText('上传文件')).toBeTruthy();
  });

  it('card mode', () => {
    const { container } = render(<Upload type="card" />);
    // screen.debug();
    expect(container.querySelector('.gio-upload')).toBeInTheDocument();
    expect(container.querySelector('.gio-upload__card')).toBeTruthy();
  });
  it('drag mode', () => {
    const { container } = render(<Upload type="drag" accept="image/*" multiple={false} />);
    expect(container.querySelector('.gio-upload')).toBeInTheDocument();
    expect(container.querySelector('.gio-upload__drag')).toBeTruthy();
  });
  it('avatar mode', () => {
    const { container } = render(<Upload type="avatar" accept="image/*" />);
    expect(container.querySelector('.gio-upload')).toBeInTheDocument();
    expect(container.querySelector('.gio-upload__avatar')).toBeTruthy();
  });
  it('controlled file', () => {
    const { container } = render(
      <Upload
        file={{
          dataUrl: 'https://www.xxx.com/zzz.txt',
          name: 'zzz.txt',
          status: 'success',
          uid: '3',
          size: 1111111,
          type: 'txt',
        }}
        type="drag"
      />
    );
    expect(container.querySelector('.gio-upload__preview-file')).toBeInTheDocument();
  });
  it('controlled file list', () => {
    const { container } = render(
      <Upload
        fileList={
          [
            {
              name: 'xxx.png',
              status: 'success',
              uid: '-1',
              url: 'https://www.simple.com/xxx.png',
            },
            {
              name: 'yyy.png',
              status: 'success',
              uid: '-11',
              url: 'https://www.simple.com/yyy.png',
            },
          ] as IUploadFile<any>[]
        }
        accept="image/*"
        maxCount={10}
        multiple
        type="drag"
      />
    );
    expect(container.querySelector('.gio-upload-file-list')).toBeInTheDocument();
    expect(container.querySelectorAll('.gio-upload-file-list-item')).toHaveLength(2);
  });
});
